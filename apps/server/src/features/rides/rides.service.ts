import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateRideDto } from './dto/create-ride.dto'
import { Ride } from './entities/ride.entity'

@Injectable()
export class RidesService {
	constructor(
		@InjectRepository(Ride)
		private readonly ridesRepository: Repository<Ride>
	) {}

	create(createRideDto: CreateRideDto) {
		const { destination, origin, passenger, travel } = createRideDto

		return this.ridesRepository.save({
			destination,
			origin,
			passenger,
			travel
		})
	}

	findAll() {
		return '`This action returns all rides`'
	}

	async findOne(options: FindOneOptions<Ride>) {
		const ride = await this.ridesRepository.findOne(options)

		if (ride == null) {
			throw new NotFoundException('Ride not found')
		}

		return ride
	}
}
