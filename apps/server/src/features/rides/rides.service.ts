import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnprocessableEntityException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DateTime } from 'luxon'
import {
	FindManyOptions,
	FindOneOptions,
	IsNull,
	MoreThan,
	Repository
} from 'typeorm'
import {
	AFTER_CANCELLED_RIDE_COOLDOWN,
	AFTER_COMPLETED_RIDE_COOLDOWN,
	Gender
} from '~/shared/constants'
import { TravelStatus } from '../travels/enums/travel-status.enum'
import { AnswerRequestDto } from './dto/answer-request.dto'
import { CancelRequestDto } from './dto/cancel-request.dto'
import { CreateRideDto } from './dto/create-ride.dto'
import { FinishRideDto } from './dto/finish-ride.dto'
import { StartRideDto } from './dto/start-ride.dto'
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

		//Travel related validations
		if (travel.status !== TravelStatus.NOT_STARTED) {
			throw new UnprocessableEntityException(
				'El viaje ya ha comenzado o ha finalizado'
			)
		}

		if (travel.forWomen && passenger.gender !== Gender.FEMALE) {
			throw new UnprocessableEntityException('Este viaje es solo para mujeres')
		}

		//Ride related validations
		const isInCooldownAfterCancelledRide = await this.ridesRepository.exists({
			where: {
				passenger: { id: passenger.id },
				deletedAt: MoreThan(DateTime.now().minus(AFTER_CANCELLED_RIDE_COOLDOWN))
			},
			order: {
				deletedAt: 'DESC'
			},
			withDeleted: true
		})

		if (isInCooldownAfterCancelledRide) {
			throw new UnprocessableEntityException(
				'El pasajero no puede solicitar otra cola hasta que pase el tiempo de espera después de cancelar una'
			)
		}

		const isInCooldownAfterCompletedRide = await this.ridesRepository.exists({
			where: {
				passenger: { id: passenger.id },
				arrivalTime: MoreThan(
					DateTime.now().minus(AFTER_COMPLETED_RIDE_COOLDOWN)
				)
			},
			order: {
				arrivalTime: 'DESC'
			}
		})

		if (isInCooldownAfterCompletedRide) {
			throw new UnprocessableEntityException(
				'El pasajero no puede solicitar otra cola hasta que pase el tiempo de espera después de completar una'
			)
		}

		const rides = await this.ridesRepository.find({
			where: [
				{
					passenger: { id: passenger.id },
					isAccepted: true,
					travelCancelType: IsNull(),
					arrivalTime: IsNull()
				},
				{
					passenger: { id: passenger.id },
					travel: { id: travel.id }
				}
			],
			relations: { travel: true },
			withDeleted: true
		})

		rides.sort((a, b) => {
			if (a.travel.id === travel.id) {
				return -1
			}

			if (b.travel.id === travel.id) {
				return 1
			}

			return 0
		})

		let previousRide: Ride | null = null

		for (const ride of rides) {
			if (ride.travel.id === travel.id) {
				if (ride.travelCancelType === TravelCancelType.PASSENGER_DENIAL) {
					previousRide = ride
					continue
				}

				if (ride.travelCancelType === TravelCancelType.DRIVER_DENIAL) {
					throw new UnprocessableEntityException(
						'El pasajero ya ha sido rechazado por el conductor en este viaje'
					)
				}

				throw new ConflictException(
					'El pasajero ya ha solicitado una cola en este viaje'
				)
			}

			throw new UnprocessableEntityException(
				'El pasajero ya ha solicitado una cola en otro viaje'
			)
		}

		if (previousRide != null) {
			await this.ridesRepository.delete({ id: previousRide.id })
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

	async find(options: FindManyOptions<Ride>) {
		const rides = await this.ridesRepository.find(options)

		if (rides == null) {
			throw new NotFoundException('Rides not found')
		}

		return rides
	}

	async answerRequest(
		options: FindOneOptions<Ride>,
		answerRequestDto: AnswerRequestDto
	) {
		const ride = await this.findOne(options)

		const { isAccepted, travelCancelType, cancellationReason } =
			answerRequestDto

		if (!isAccepted) {
			if (travelCancelType == null) {
				throw new UnprocessableEntityException(
					'Travel cancel type must be provided when rejecting a ride request'
				)
			}

			await this.cancelRequest(options, {
				travelCancelType,
				reason: cancellationReason
			})
		}

		await this.ridesRepository.update(
			{ internalId: ride.internalId },
			{ isAccepted: answerRequestDto.isAccepted }
		)

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

		await this.ridesRepository.softDelete({ id: ride.id })

		const updatedRide = await this.ridesRepository.update(
			{ id: ride.id },
			{
				...cancelRequestDto
			}
		)

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

	async driverComplete({
		rideId: id,
		driverCommentAfterRide,
		driverStarRating
	}: {
		rideId: Ride['id']
		driverCommentAfterRide?: Ride['driverCommentAfterRide']
		driverStarRating: Ride['driverStarRating']
	}) {
		const ride = await this.findOne({ where: { id } })

		if (!ride.tookTheRide) {
			throw new UnprocessableEntityException('Ride was not taken')
		}

		await this.ridesRepository.update(
			{ id: ride.id },
			{
				driverCommentAfterRide,
				driverStarRating
			}
		)
	}
}
