import {
	Inject,
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
	forwardRef
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Equal, Not, Repository } from 'typeorm'
import { VEHICLES_MAX_AMOUNT } from '~/shared/constants'
import { UnknownError } from '~/shared/errors'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { Vehicle } from './entities/vehicle.entity'

@Injectable()
export class VehiclesService {
	constructor(
		@InjectRepository(Vehicle)
		private readonly vehiclesRepository: Repository<Vehicle>,
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService
	) {}

	async create(driverId: User['id'], createVehicleDto: CreateVehicleDto) {
		let driver: User

		try {
			driver = await this.usersService.findOne(driverId)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Driver does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		const vehicles = await this.findByDriver(driverId)

		if (vehicles.length >= VEHICLES_MAX_AMOUNT) {
			throw new UnprocessableEntityException(
				`Driver already has ${VEHICLES_MAX_AMOUNT} vehicles`
			)
		}

		return this.vehiclesRepository.save({ ...createVehicleDto, driver })
	}

	async findByVehicle(vehicleId: Vehicle['id']) {
		return await this.vehiclesRepository.findOneBy({ id: vehicleId })
	}

	async findByDriver(driverId: User['id']) {
		try {
			await this.usersService.findOne(driverId)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Driver does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		return await this.vehiclesRepository.find({
			where: { driver: { id: driverId } },
			order: { createdAt: 'DESC' }
		})
	}

	async findOneByDriver(id: Vehicle['id'], driverId: User['id']) {
		const vehicle = await this.vehiclesRepository.findOneBy({
			id,
			driver: { id: driverId }
		})

		if (vehicle == null) {
			throw new NotFoundException('Vehicle not found')
		}

		return vehicle
	}

	async update(
		id: Vehicle['id'],
		driverId: User['id'],
		updateVehicleDto: UpdateVehicleDto
	) {
		try {
			await this.findOneByDriver(id, driverId)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Vehicle does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		try {
			const otherVehicleWithPlate = await this.vehiclesRepository.findOne({
				where: { id: Not(Equal(id)), plate: updateVehicleDto.plate }
			})

			if (otherVehicleWithPlate != null) {
				throw new UnprocessableEntityException('Plate already in use')
			}
		} catch (error: unknown) {
			if (error instanceof UnprocessableEntityException) {
				throw error
			}

			throw new UnknownError(undefined, { cause: error })
		}

		return this.vehiclesRepository.update({ id }, updateVehicleDto)
	}

	async remove(id: Vehicle['id'], driverId: User['id']) {
		try {
			await this.findOneByDriver(id, driverId)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Vehicle does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		return await this.vehiclesRepository.softDelete({
			id
		})
	}
}
