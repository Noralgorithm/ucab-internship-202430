import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { AnswerRequestDto } from './dto/answer-request.dto'
import { CreateRideDto } from './dto/create-ride.dto'
import { Ride } from './entities/ride.entity'

@Injectable()
export class RidesService {
	constructor(
		@InjectRepository(Ride)
		private readonly ridesRepository: Repository<Ride>
	) {}

	async create(createRideDto: CreateRideDto) {
		const { destination, origin, passenger, travel } = createRideDto

		const ride = this.ridesRepository.create({
			destination,
			origin,
			passenger,
			travel
		})

		return await this.ridesRepository.save(ride)
	}

	async findOne(options: FindOneOptions<Ride>) {
		const ride = await this.ridesRepository.findOne(options)

		if (ride == null) {
			throw new NotFoundException('Ride not found')
		}

		return ride
	}

	async answerRequest(
		options: FindOneOptions<Ride>,
		answerRequestDto: AnswerRequestDto
	) {
		const ride = await this.findOne(options)

		const updatedRide = await this.ridesRepository.update(ride, {
			isAccepted: answerRequestDto.isAccepted
		})

		return updatedRide
	}
}
