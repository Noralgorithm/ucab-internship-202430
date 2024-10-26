import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
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
		answerRequestDto: AnswerRequestDto,
		requester: User
	) {
		const ride = await this.findOne({
			...options,
			relations: { travel: { vehicle: { driver: true } } }
		})

		const invalidRequester =
			!requester.isDriver || ride.travel.vehicle.driver.id !== requester.id

		if (invalidRequester) {
			throw new UnprocessableEntityException('Esta cola no existe')
		}

		await this.ridesRepository.update(ride.internalId, {
			isAccepted: answerRequestDto.isAccepted,
			travelCancelType: TravelCancelType.DRIVER_DENIAL
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
