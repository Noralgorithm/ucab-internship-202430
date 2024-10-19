import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { GeoJsonPoint } from '~/shared/types'
import { User } from '../users/entities/user.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { VehiclesService } from '../vehicles/vehicles.service'
import { ChangeTravelStatusDto } from './dto/change-travel-status.dto'
import { CreateTravelDto } from './dto/create-travel.dto'
import { UpdateTravelDto } from './dto/update-travel.dto'
import { Travel } from './entities/travel.entity'
import { TravelStatus } from './enums/travel-status.enum'

@Injectable()
export class TravelsService {
	constructor(
		@InjectRepository(Travel)
		private readonly travelsRepository: Repository<Travel>,
		private readonly vehiclesService: VehiclesService
	) {}

	async create(driverId: User['id'], createTravelDto: CreateTravelDto) {
		let vehicle: Vehicle
		try {
			vehicle = await this.vehiclesService.findOneByDriver(
				createTravelDto.vehicleId,
				driverId
			)
		} catch (error) {
			throw new UnprocessableEntityException(
				'No se encontró el vehículo especificado'
			)
		}

		const {
			availableSeatQuantity,
			forWomen,
			status,
			type,
			route: { description, distance, duration, polyline }
		} = createTravelDto

		const origin: GeoJsonPoint = {
			type: 'Point',
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that coordinates is not empty and has at least two elements
			coordinates: polyline.coordinates.at(0)!
		}

		const destination: GeoJsonPoint = {
			type: 'Point',
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that coordinates is not empty and has at least two elements
			coordinates: polyline.coordinates.at(-1)!
		}

		const travel = this.travelsRepository.save({
			availableSeatQuantity,
			forWomen,
			description,
			distance,
			duration,
			geoJsonLineString: polyline,
			status,
			type,
			origin,
			destination,
			vehicle
		})

		return travel
	}

	async findOne(options: FindOneOptions<Travel>) {
		const travel = await this.travelsRepository.findOne(options)

		if (travel == null) {
			throw new NotFoundException('Travel not found')
		}

		return travel
	}

	async update(id: number, updateTravelDto: UpdateTravelDto) {
		return `This action updates a #${id} travel`
	}

	async remove(id: number) {
		return `This action removes a #${id} travel`
	}

	async getAvailableDrivers() {
		const travels = await this.travelsRepository.find({
			where: { status: TravelStatus.NOT_STARTED },
			order: { createdAt: 'DESC' },
			relations: { vehicle: { driver: true } }
		})

		return travels
	}

	async findRideRequests(options: FindOneOptions<Travel>) {
		const travelRideRequests = await this.travelsRepository.findOne({
			where: options.where,
			relations: ['rides', 'rides.passenger']
		})

		return travelRideRequests?.rides
	}

	async changeStatus(
		options: FindOneOptions<Travel>,
		startTravelDto: ChangeTravelStatusDto
	) {
		const travel = await this.findOne(options)

		const updatedRide = await this.travelsRepository.update(travel, {
			...startTravelDto
		})

		return updatedRide
	}
}
