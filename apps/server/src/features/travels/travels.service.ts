import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
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
		// private readonly routesService: RoutesService
	) {}

	async create(driverId: User['id'], createTravelDto: CreateTravelDto) {
		const vehicle = await this.vehiclesService.findOneByDriver(
			createTravelDto.vehicleId,
			driverId
		)

		// ObtenerRoute
		// const route = await this.routesService.find(createTravelDto.routeId)

		const travel = this.travelsRepository.create({
			...createTravelDto,
			vehicle
			// route
		})

		return this.travelsRepository.save(travel)
	}

	async findAll() {
		return '`This action returns all travels`'
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
