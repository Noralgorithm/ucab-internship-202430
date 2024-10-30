import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DateTime } from 'luxon'
import { FindOneOptions, Repository } from 'typeorm'
import { AnswerRequestDto } from './dto/answer-request.dto'
import { CancelRequestDto } from './dto/cancel-request.dto'
import { CreateRideDto } from './dto/create-ride.dto'
import { FinishRideDto } from './dto/finish-ride.dto'
import { StartRideDto } from './dto/start-ride.dto'
import { Ride } from './entities/ride.entity'

@Injectable()
export class RidesService {
	constructor(
		@InjectRepository(Ride)
		private readonly ridesRepository: Repository<Ride>
	) {}

	//TODO: validate that this user is not in a travel that has not been completed or cancelled
	async create(createRideDto: CreateRideDto) {
		const { destination, origin, passenger, travel } = createRideDto

		const rides = await this.ridesRepository.find({
			where: {
				passenger: { id: passenger.id },
				isAccepted: true,
				travelCancelType: undefined,
				arrivalTime: undefined
			}
		})

		if (rides.length > 0) {
			throw new UnprocessableEntityException('Passenger already has a ride')
		}

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
		const ride = await this.findOne({
			...options,
			relations: { travel: { vehicle: { driver: true } } }
		})

		const { isAccepted, travelCancelType, cancellationReason } =
			answerRequestDto

		const updateData: Partial<Ride> = { isAccepted }

		if (!ride.isAccepted) {
			updateData.travelCancelType = travelCancelType
			updateData.cancellationReason = cancellationReason
		}

		await this.ridesRepository.update(ride.internalId, updateData)

		return 'Ride request answered'
	}

	async cancelRequest(
		options: FindOneOptions<Ride>,
		cancelRequestDto: CancelRequestDto
	) {
		const ride = await this.findOne(options)

		const rideAlreadyCancelled = ride.travelCancelType != null

		if (rideAlreadyCancelled) {
			throw new UnprocessableEntityException('Ride has already been canceled')
		}

		const rideHasStarted = ride.tookTheRide

		if (rideHasStarted) {
			throw new UnprocessableEntityException('Ride has already started')
		}

		const rideIsCompleted = ride.arrivalTime != null

		if (rideIsCompleted) {
			throw new UnprocessableEntityException('Ride has already been completed')
		}

		const updatedRide = await this.ridesRepository.update(ride, {
			...cancelRequestDto
		})

		return updatedRide
	}

	async start({ rideId: id }: StartRideDto) {
		const ride = await this.findOne({ where: { id } })

		if (ride.tookTheRide) {
			throw new UnprocessableEntityException('Ride has already started')
		}

		if (!ride.isAccepted) {
			throw new UnprocessableEntityException("Not accepted rides can't start")
		}

		if (ride.travelCancelType != null) {
			throw new UnprocessableEntityException('Ride has been cancelled')
		}

		const rideIsCompleted = ride.arrivalTime != null

		if (rideIsCompleted) {
			throw new UnprocessableEntityException('Ride has already been completed')
		}

		await this.ridesRepository.update(
			{ id: ride.id },
			{
				tookTheRide: true
			}
		)
	}

	async complete({
		rideId: id,
		dropOff,
		passengerCommentAfterRide,
		passengerStarRating
	}: FinishRideDto) {
		const ride = await this.findOne({ where: { id } })

		if (ride.arrivalTime) {
			throw new UnprocessableEntityException('Ride has already been completed')
		}

		if (!ride.tookTheRide) {
			throw new UnprocessableEntityException('Ride was not taken')
		}

		if (ride.travelCancelType != null) {
			throw new UnprocessableEntityException('Ride has been canceled')
		}

		await this.ridesRepository.update(
			{ id: ride.id },
			{
				arrivalTime: DateTime.now(),
				dropOff,
				passengerCommentAfterRide,
				passengerStarRating
			}
		)
	}
}
