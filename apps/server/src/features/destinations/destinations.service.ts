import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
	GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE,
	GOOGLE_MAPS_STATIC_MAPS
} from '~/shared/constants'
import { UnknownError } from '~/shared/errors'
import { FileStorageService } from '~/shared/files-upload/file-storage/file-storage.service'
import { GoogleMapsAPIError } from '../routes/google-maps/errors'
import { User } from '../users/entities/user.entity'
import { CreateDestinationDto } from './dto/create-destination.dto'
import { UpdateDestinationDto } from './dto/update-destination.dto'
import { Destination } from './entities/destination.entity'

//TODO: (low priority) make DestinationsService an interface, with GoogleMapsDestinationsService as an implementation
@Injectable()
export class DestinationsService {
	constructor(
		@InjectRepository(Destination)
		private readonly destinationsRepository: Repository<Destination>,
		private readonly fileStorageService: FileStorageService,
		private readonly configService: ConfigService
	) {}

	async takeDestinationPhoto(
		latitude: number,
		longitude: number
	): Promise<string> {
		const params = new Map([
			['markers', `size:mid|label:D|${latitude},${longitude}`],
			['size', '300x300'],
			['key', this.configService.get('GOOGLE_MAPS_API_KEY') as string],
			['format', 'png'],
			['maptype', 'roadmap'],
			['language', GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE],
			['scale', '2']
		] as const)

		const googleMapsUrl = new URL(GOOGLE_MAPS_STATIC_MAPS.url)

		for (const [key, value] of params) {
			googleMapsUrl.searchParams.append(key, value)
		}

		const response = await fetch(googleMapsUrl, {
			method: GOOGLE_MAPS_STATIC_MAPS.method
		})

		if (!response.ok) {
			throw new GoogleMapsAPIError('Error al obtener la imagen del mapa')
		}

		const imageAsBlob = await response.blob()

		const buffer = Buffer.from(await imageAsBlob.arrayBuffer())

		const photoFilename = this.fileStorageService.save({
			buffer,
			mimetype: 'image/png',
			size: buffer.length
		})

		return photoFilename
	}

	async create(createDestinationDto: CreateDestinationDto, passenger: User) {
		const { latitude, longitude, name } = createDestinationDto

		const destinationPhotoFilename = await this.takeDestinationPhoto(
			latitude,
			longitude
		)

		const destination = this.destinationsRepository.create({
			name,
			longitude,
			latitude,
			destinationPhotoFilename,
			user: passenger
		})

		return await this.destinationsRepository.save(destination)
	}

	async findByPassenger(passenger: User) {
		return await this.destinationsRepository.find({
			where: { user: { internalId: passenger.internalId } },
			order: { createdAt: 'DESC' }
		})
	}

	async findOneByPassenger(id: Destination['id'], passenger: User) {
		const destination = await this.destinationsRepository.findOneBy({
			id,
			user: { id: passenger.id }
		})

		if (destination == null) {
			throw new NotFoundException('Destination not found')
		}

		return destination
	}

	async findByDestination(destinationId: Destination['id']) {
		return await this.destinationsRepository.findOneBy({ id: destinationId })
	}

	async update(
		id: Destination['id'],
		driver: User,
		updateVehicleDto: UpdateDestinationDto
	) {
		let destination: Destination

		try {
			destination = await this.findOneByPassenger(id, driver)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Destination does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		let { latitude, longitude, name } = updateVehicleDto

		latitude ??= destination.latitude
		longitude ??= destination.longitude

		const destinationPhotoFilename = await this.takeDestinationPhoto(
			latitude,
			longitude
		)

		const results = await this.destinationsRepository.update(
			{ id },
			{ latitude, longitude, name, destinationPhotoFilename }
		)

		try {
			this.fileStorageService.delete(destination.destinationPhotoFilename)
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				error.message.includes('EPERM: operation not permitted, unlink')
			) {
				console.error(
					`Error deleting destination photo ${destination.destinationPhotoFilename}`,
					{ cause: error }
				)
			}

			throw new UnknownError(undefined, { cause: error })
		}

		return results
	}

	async remove(id: Destination['id'], passenger: User) {
		try {
			await this.findOneByPassenger(id, passenger)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Destination does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		return await this.destinationsRepository.softDelete({
			id
		})
	}
}
