import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateRideDto } from './dto/create-ride.dto'
import { UpdateRideDto } from './dto/update-ride.dto'
import { Ride } from './entities/ride.entity'

@Injectable()
export class RidesService {
	constructor(
		@InjectRepository(Ride) private readonly ridesRepository: Repository<Ride>
	) {}

	create(createRideDto: CreateRideDto) {
		return 'This action adds a new ride'
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

	update(id: number, updateRideDto: UpdateRideDto) {
		return `This action updates a #${id} ride`
	}

	remove(id: number) {
		return `This action removes a #${id} ride`
	}
}
