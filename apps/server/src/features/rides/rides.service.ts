import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { AnswerRequestDto } from './dto/answer-request.dto'
import { CancelRequestDto } from './dto/cancel-request.dto'
import { CreateRideDto } from './dto/create-ride.dto'
import { Ride } from './entities/ride.entity'
import { TravelCancelType } from './enums/travel-cancel-type.enum'

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

	// TODO: Prettify how requester is validated
	async answerRequest(
		options: FindOneOptions<Ride>,
		answerRequestDto: AnswerRequestDto
	) {
		const ride = await this.findOne({
			...options,
			relations: { travel: { vehicle: { driver: true } } }
		})

		const travelCancelType = answerRequestDto.isAccepted
			? TravelCancelType.DRIVER_DENIAL
			: undefined

		await this.ridesRepository.update(ride.internalId, {
			isAccepted: answerRequestDto.isAccepted,
			travelCancelType
		})

		return 'Ride request answered'
	}

	// TODO: Validate that is not possible to cancel an already canceled request
	async cancelRequest(
		options: FindOneOptions<Ride>,
		cancelRequestDto: CancelRequestDto
	) {
		const ride = await this.findOne(options)

		const updatedRide = await this.ridesRepository.update(ride, {
			...cancelRequestDto
		})

		return updatedRide
	}
}
