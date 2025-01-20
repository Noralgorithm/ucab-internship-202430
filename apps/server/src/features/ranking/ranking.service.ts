import {
	Inject,
	Injectable,
	UnprocessableEntityException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, Equal, Not, Or, Repository } from 'typeorm'
import { Gender, RouteType } from '~/shared/constants'
import { Travel } from '../travels/entities/travel.entity'
import { TravelStatus } from '../travels/enums/travel-status.enum'
import { TravelsService } from '../travels/travels.service'
import { UsersService } from '../users/users.service'
import { RankingDto } from './dto/ranking.dto'
import { DistanceMatrix, DistanceMatrixStrategy } from './strategies/types'

const MAX_ELEMENTS_PER_REQUEST = 25

@Injectable()
export class RankingService {
	constructor(
		@Inject(DistanceMatrixStrategy)
		private readonly distanceMatrixStrategy: DistanceMatrixStrategy,
		private readonly usersService: UsersService,
		private readonly travelsService: TravelsService,
		@InjectRepository(Travel)
		private readonly travelsRepository: Repository<Travel>
	) {}

	//TODO: don't match passenger if they already are in a ride that has not been completed or cancelled
	//TODO: don't match passenger if they currently are driver of a not completed or cancelled travel
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
				'No puedes buscar rutas si eres conductor de un viaje que no se ha completado'
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
			.getMany()

		if (travels.length <= 0) {
			return []
		}

		const travelsDistanceMatrix = await Promise.all(
			travels.map(async (t) => {
				const chunkSize = MAX_ELEMENTS_PER_REQUEST

				const travelDistanceMatrix = {
					travelId: t.id,
					distanceMatrix: [] as DistanceMatrix[]
				} as {
					travelId: Travel['id']
					distanceMatrix: DistanceMatrix[]
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

		return travelsDistanceMatrix
			.sort(
				(a, b) => a.distanceMatrix[0].distance - b.distanceMatrix[0].distance
			)
			.map(({ travelId, distanceMatrix }) => ({
				travelId,
				distance: distanceMatrix[0]
			}))
	}
}

export interface RankResponse {
	travelId: Travel['id']
	distance: DistanceMatrix
}
