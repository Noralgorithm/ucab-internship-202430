import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateRideDto } from './dto/create-ride.dto'
import { UpdateRideDto } from './dto/update-ride.dto'
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

	findOne(id: number) {
		return `This action returns a #${id} ride`
	}

	update(id: number, updateRideDto: UpdateRideDto) {
		return `This action updates a #${id} ride`
	}

	remove(id: number) {
		return `This action removes a #${id} ride`
	}
}
