import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { VehiclesService } from '../vehicles/vehicles.service'
import { CreateTravelDto } from './dto/create-travel.dto'
import { UpdateTravelDto } from './dto/update-travel.dto'
import { Travel } from './entities/travel.entity'

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

		const travel = this.travelsRepository.create({
			...createTravelDto,
			distance: createTravelDto.route.distance,
			duration: createTravelDto.route.duration,
			description: createTravelDto.route.description,
			geoJsonLineString: createTravelDto.route.polyline,
			vehicle
		})

		return this.travelsRepository.save(travel)
	}

	async findOne(id: number) {
		return `This action returns a #${id} travel`
	}

	async update(id: number, updateTravelDto: UpdateTravelDto) {
		return `This action updates a #${id} travel`
	}

	async remove(id: number) {
		return `This action removes a #${id} travel`
	}
}
