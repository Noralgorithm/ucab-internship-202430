import {
	Inject,
	Injectable,
	UnprocessableEntityException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Equal, In, IsNull, Not, Or, Repository } from 'typeorm'
import { Gender, RouteType } from '~/shared/constants'
import { Ride } from '../rides/entities/ride.entity'
import { Travel } from '../travels/entities/travel.entity'
import { TravelStatus } from '../travels/enums/travel-status.enum'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { RankingDto } from './dto/ranking.dto'
import { TravelDistanceMatrixPerPassenger } from './entities/travel-distance-matrix-per-passenger.entity'
import { DistanceMatrix, DistanceMatrixStrategy } from './strategies/types'

const MAX_ELEMENTS_PER_REQUEST = 25

@Injectable()
export class RankingService {
	constructor(
		@Inject(DistanceMatrixStrategy)
		private readonly distanceMatrixStrategy: DistanceMatrixStrategy,
		private readonly usersService: UsersService,
		@InjectRepository(Travel)
		private readonly travelsRepository: Repository<Travel>,
		@InjectRepository(Ride)
		private readonly ridesRepository: Repository<Ride>,
		@InjectRepository(TravelDistanceMatrixPerPassenger)
		private readonly travelDistanceMatrixPerPassengerRepository: Repository<TravelDistanceMatrixPerPassenger>
	) {}

	//TODO: don't match passenger if they already are in a ride that has not been completed or cancelled
	//TODO: don't match passenger if they currently are driver of a not completed or cancelled travel
	//* Tested with not completed travels and rides, pending to test with cancelled travels and rides
	async rank({
		passenger,
		routeType,
		womenOnly
	}: RankingDto): Promise<RankResponse[]> {
		const passengerInMemory = await this.usersService.findOne(passenger.id)

		if (passengerInMemory.gender !== Gender.FEMALE && womenOnly) {
			throw new UnprocessableEntityException(
				'Solo las pasajeras pueden buscar rutas exclusivas para mujeres'
			)
		}

		if (
			await this.travelsRepository.exists({
				where: {
					vehicle: { driver: { id: passenger.id } },
					status: Or(
						Not(Equal(TravelStatus.COMPLETED)),
						Not(Equal(TravelStatus.CANCELLED))
					)
				}
			})
		) {
			throw new UnprocessableEntityException(
				'No puedes buscar rutas si eres conductor de un viaje que no se ha completado o cancelado'
			)
		}

		if (
			await this.ridesRepository.exists({
				where: [
					{
						passenger: { id: passenger.id },
						travelCancelType: IsNull()
					},
					{
						passenger: { id: passenger.id },
						arrivalTime: IsNull()
					}
				]
			})
		) {
			throw new UnprocessableEntityException(
				'No puedes buscar rutas si estás en una cola que no se ha completado o cancelado'
			)
		}

		const travels = await this.travelsRepository
			.createQueryBuilder('t')
			.addCommonTableExpression(
				this.travelsRepository
					.createQueryBuilder('t')
					.select('t.id AS id')
					.withDeleted()
					.leftJoin('t.rides', 'r')
					.innerJoin(
						't.vehicle',
						'v',
						'v.internal_id = t.vehicle_internal_id AND (v.deleted_at IS NULL)'
					)
					.innerJoin(
						'v.driver',
						'd',
						'd.internal_id = v.driver_internal_id AND (d.deleted_at IS NULL)'
					)
					.where("t.status = 'not-started'")
					.andWhere('t.type = :type', { type: routeType })
					.andWhere(
						passengerInMemory.gender === Gender.FEMALE
							? new Brackets((qb) => {
									qb.where('t.for_women = true').orWhere(
										't.for_women = :forWomen',
										{
											forWomen: womenOnly
										}
									)
								})
							: 't.for_women = false'
					)
					.andWhere('t.deleted_at IS NULL')
					.groupBy('t.id')
					.having('BOOL_AND(r.passenger_internal_id != :passengerId)', {
						passengerId: passengerInMemory.internalId
					})
					.orHaving('COUNT(r.id) = 0'),
				'available_travels'
			)
			.innerJoin('available_travels', 'at', 'at.id = t.id')
			.innerJoinAndSelect('t.vehicle', 'v')
			.innerJoinAndSelect('v.driver', 'd')
			.leftJoinAndSelect(
				't.rides',
				'r',
				'r.travel_internal_id = t.internal_id AND r.is_accepted IS TRUE'
			)
			.getMany()

		if (travels.length <= 0) {
			return []
		}

		const travelsDistanceMatrixPerPassenger =
			await this.travelDistanceMatrixPerPassengerRepository.find({
				where: {
					passenger: { id: passenger.id },
					travel: { id: In(travels.map((t) => t.id)) }
				},
				relations: { travel: true, passenger: true }
			})

		const travelsDistanceMatrix = await Promise.all(
			travels.map(async (t) => {
				const precalculatedTravelDistanceMatrix =
					travelsDistanceMatrixPerPassenger.find(
						(tdm) => tdm.travel.id === t.id
					)

				if (precalculatedTravelDistanceMatrix != null) {
					return {
						travel: t,
						rating: t.vehicle.driver.totalStarRating,
						reviewsQuantity: t.vehicle.driver.totalReviewsQuantity,
						distanceMatrix: [
							{
								destination: precalculatedTravelDistanceMatrix.destination,
								distance: precalculatedTravelDistanceMatrix.distance,
								duration: precalculatedTravelDistanceMatrix.duration,
								origin: precalculatedTravelDistanceMatrix.origin
							}
						] as DistanceMatrix[],
						passengerAmount: t.rides.length
					} as {
						travel: Travel
						rating: User['totalStarRating']
						reviewsQuantity: User['totalReviewsQuantity']
						distanceMatrix: DistanceMatrix[]
						passengerAmount: number
					}
				}

				const chunkSize = MAX_ELEMENTS_PER_REQUEST

				const travelDistanceMatrix = {
					travel: t,
					rating: t.vehicle.driver.totalStarRating,
					reviewsQuantity: t.vehicle.driver.totalReviewsQuantity,
					distanceMatrix: [] as DistanceMatrix[],
					passengerAmount: t.rides.length
				} as {
					travel: Travel
					rating: User['totalStarRating']
					reviewsQuantity: User['totalReviewsQuantity']
					distanceMatrix: DistanceMatrix[]
					passengerAmount: number
				}

				for (
					let i = 0;
					i < t.geoJsonLineString.coordinates.length;
					i += chunkSize
				) {
					const coordinatesChunk = t.geoJsonLineString.coordinates.slice(
						i,
						i + chunkSize
					)

					const chunkDistanceMatrix = await this.distanceMatrixStrategy.get(
						routeType === RouteType.TO_UCAB
							? {
									origins: [passenger.location],
									destinations: [
										{ type: 'LineString', coordinates: coordinatesChunk }
									]
								}
							: {
									origins: [
										{ type: 'LineString', coordinates: coordinatesChunk }
									],
									destinations: [passenger.location]
								}
					)

					travelDistanceMatrix.distanceMatrix.push(...chunkDistanceMatrix)
				}

				travelDistanceMatrix.distanceMatrix = [
					travelDistanceMatrix.distanceMatrix.sort(
						(a, b) => a.distance - b.distance
					)[0]
				]

				return travelDistanceMatrix
			})
		)

		for (const t of travelsDistanceMatrix) {
			const precalculatedTravelDistanceMatrix =
				travelsDistanceMatrixPerPassenger.find(
					(tdm) => tdm.travel.id === t.travel.id
				)

			if (precalculatedTravelDistanceMatrix != null) {
				continue
			}

			const passengerInMemory = await this.usersService.findOne(passenger.id)

			await this.travelDistanceMatrixPerPassengerRepository.save({
				origin: passenger.location,
				destination: t.distanceMatrix[0].destination,
				distance: t.distanceMatrix[0].distance,
				duration: t.distanceMatrix[0].duration,
				travel: t.travel,
				passenger: passengerInMemory
			})
		}

		return travelsDistanceMatrix
			.sort(
				(a, b) => a.distanceMatrix[0].distance - b.distanceMatrix[0].distance
			)
			.map(({ travel, passengerAmount, rating, reviewsQuantity }) => ({
				travel,
				passengerAmount,
				rating,
				reviewsQuantity
			}))
	}
}

export interface RankResponse {
	travel: Travel
	rating: User['totalStarRating']
	reviewsQuantity: User['totalReviewsQuantity']
	passengerAmount: number
}
