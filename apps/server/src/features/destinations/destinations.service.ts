import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UnknownError } from '~/shared/errors'
import { User } from '../users/entities/user.entity'
import { CreateDestinationDto } from './dto/create-destination.dto'
import { UpdateDestinationDto } from './dto/update-destination.dto'
import { Destination } from './entities/destination.entity'

@Injectable()
export class DestinationsService {
	constructor(
		@InjectRepository(Destination)
		private readonly destinationsRepository: Repository<Destination>
	) {}

	async create(createDestinationDto: CreateDestinationDto, passenger: User) {
		const destination = this.destinationsRepository.create({
			...createDestinationDto,
			user: passenger
		})

		return await this.destinationsRepository.save(destination)
	}

	async findByPassenger(passenger: User) {
		return await this.destinationsRepository.find({
			where: { user: passenger },
			order: { createdAt: 'DESC' }
		})
	}

	async findOneByPassenger(id: Destination['id'], passengerId: User['id']) {
		const destination = await this.destinationsRepository.findOneBy({
			id,
			user: { id: passengerId }
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
		driverId: User['id'],
		updateVehicleDto: UpdateDestinationDto
	) {
		try {
			await this.findOneByPassenger(id, driverId)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Destination does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		return this.destinationsRepository.update({ id }, updateVehicleDto)
	}

	async remove(id: Destination['id'], passengerId: User['id']) {
		try {
			await this.findOneByPassenger(id, passengerId)
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
