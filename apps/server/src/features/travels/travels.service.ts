import {
	Inject,
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
	forwardRef
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DateTime } from 'luxon'
import { Equal, FindOneOptions, Or, Repository } from 'typeorm'
import { Gender } from '~/shared/constants'
import { GeoJsonPoint } from '~/shared/types'
import { TravelCancelType } from '../rides/enums/travel-cancel-type.enum'
import { RidesService } from '../rides/rides.service'
import { User } from '../users/entities/user.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { VehiclesService } from '../vehicles/vehicles.service'
import { AvailableDriversFiltersDto } from './dto/available-drivers-filters.dto'
import { CancelDto } from './dto/cancel.dto'
import { ChangeTravelStatusDto } from './dto/change-travel-status.dto'
import { CompleteDto } from './dto/complete.dto'
import { CreateTravelDto } from './dto/create-travel.dto'
import { StartDto } from './dto/start.dto'
import { UpdateTravelDto } from './dto/update-travel.dto'
import { Travel } from './entities/travel.entity'
import { TravelStatus } from './enums/travel-status.enum'

@Injectable()
export class TravelsService {
	constructor(
		@InjectRepository(Travel)
		private readonly travelsRepository: Repository<Travel>,
		@Inject(forwardRef(() => VehiclesService))
		private readonly vehiclesService: VehiclesService,
		private readonly ridesService: RidesService
	) {}

	//TODO: validate that this user is not in a ride that has not been completed or cancelled
	async create(driverId: User['id'], createTravelDto: CreateTravelDto) {
		let vehicle: Vehicle
		try {
			vehicle = await this.vehiclesService.findOneByDriver(
				createTravelDto.vehicleId,
				driverId
			)
		} catch (error) {
			throw new UnprocessableEntityException(
				'No se encontró el vehículo especificado'
			)
		}

		const travels = await this.travelsRepository.find({
			where: {
				vehicle: { driver: { id: driverId } },
				status: Or(
					Equal(TravelStatus.NOT_STARTED),
					Equal(TravelStatus.IN_PROGRESS)
				)
			}
		})

		if (travels.length > 0) {
			throw new UnprocessableEntityException('Ya tienes un viaje en curso')
		}

		const {
			availableSeatQuantity,
			forWomen,
			type,
			route: { description, distance, duration, polyline }
		} = createTravelDto

		const origin: GeoJsonPoint = {
			type: 'Point',
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that coordinates is not empty and has at least two elements
			coordinates: polyline.coordinates.at(0)!
		}

		const destination: GeoJsonPoint = {
			type: 'Point',
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that coordinates is not empty and has at least two elements
			coordinates: polyline.coordinates.at(-1)!
		}

		const travel = this.travelsRepository.save({
			availableSeatQuantity,
			forWomen,
			description,
			distance,
			duration,
			geoJsonLineString: polyline,
			status: TravelStatus.NOT_STARTED,
			type,
			origin,
			destination,
			vehicle
		})

		return travel
	}

	async findOne(options: FindOneOptions<Travel>) {
		const travel = await this.travelsRepository.findOne(options)

		if (travel == null) {
			throw new NotFoundException('Travel not found')
		}

		return travel
	}

	async update(id: number, updateTravelDto: UpdateTravelDto) {
		return `This action updates a #${id} travel`
	}

	async remove(id: number) {
		return `This action removes a #${id} travel`
	}

	// TODO: Implement Match Algorithm using Point
	async getAvailableDrivers(
		availableDriversFiltersDto: AvailableDriversFiltersDto,
		currentUser: User
	) {
		let travels: Travel[]
		if (currentUser.gender === Gender.MALE) {
			travels = await this.travelsRepository.find({
				where: {
					status: TravelStatus.NOT_STARTED,
					type: availableDriversFiltersDto.type,
					forWomen: false
				},
				order: { createdAt: 'DESC' },
				relations: { vehicle: { driver: true }, rides: { passenger: true } }
			})
		} else {
			travels = await this.travelsRepository.find({
				where: [
					{
						status: TravelStatus.NOT_STARTED,
						type: availableDriversFiltersDto.type,
						forWomen: availableDriversFiltersDto.isWomanOnly
					},
					{
						status: TravelStatus.NOT_STARTED,
						type: availableDriversFiltersDto.type,
						forWomen: false
					}
				],
				order: { createdAt: 'DESC' },
				relations: { vehicle: { driver: true }, rides: { passenger: true } }
			})
		}

		const filteredTravels = travels.filter(
			(travel) =>
				!travel.rides.some(
					(ride) =>
						ride.passenger.id === currentUser.id &&
						ride.travelCancelType === TravelCancelType.DRIVER_DENIAL
				)
		)

		const formattedTravels = await Promise.all(
			filteredTravels.map(
				async ({
					rides,
					geoJsonLineString,
					origin,
					destination,
					...travel
				}) => {
					const [rating, reviewsQuantity] =
						await this.ridesService.calculateRating(travel.vehicle.driver.id)

					return {
						...travel,
						rating,
						reviewsQuantity,
						passengerAmount: rides.filter((ride) => ride.isAccepted).length
					}
				}
			)
		)

		return formattedTravels
	}

	async findRideRequests(options: FindOneOptions<Travel>) {
		const travelRideRequests = await this.travelsRepository.findOne({
			where: options.where,
			relations: { rides: { passenger: true } }
		})

		const rideRequests = travelRideRequests?.rides.filter(
			(ride) => ride.isAccepted === null
		)

		if (rideRequests) {
			const formattedRideRequests = await Promise.all(
				rideRequests.map(async ({ ...ride }) => {
					const [rating, reviewsQuantity] =
						await this.ridesService.calculateRating(ride.passenger.id)

					const newRide = {
						...ride,
						passenger: {
							...ride.passenger,
							rating,
							reviewsQuantity
						}
					}
					return {
						...newRide
					}
				})
			)

			return formattedRideRequests
		}
	}

	async changeStatus(
		options: FindOneOptions<Travel>,
		startTravelDto: ChangeTravelStatusDto
	) {
		const travel = await this.findOne(options)

		const updatedRide = await this.travelsRepository.update(travel, {
			...startTravelDto
		})

		return updatedRide
	}

	async start({ travelId }: StartDto) {
		//biome-ignore lint/style/noNonNullAssertion: Already validated
		const travel = (await this.travelsRepository.findOne({
			where: { id: travelId },
			relations: { rides: true }
		}))!

		if (travel.status !== TravelStatus.NOT_STARTED) {
			throw new UnprocessableEntityException('El viaje ya ha comenzado')
		}

		await this.travelsRepository.update(
			{ id: travel.id },
			{
				status: TravelStatus.IN_PROGRESS,
				departureTime: DateTime.now()
			}
		)

		await Promise.all(
			travel.rides.map(async (ride) => {
				//! don't do this at home kids
				try {
					await this.ridesService.start({ rideId: ride.id })
				} catch (_) {}
			})
		)
	}

	async cancel({ travelId, reason }: CancelDto) {
		//biome-ignore lint/style/noNonNullAssertion: Already validated
		const travel = (await this.travelsRepository.findOne({
			where: { id: travelId },
			relations: { rides: true }
		}))!

		if (travel.status === TravelStatus.CANCELLED) {
			throw new UnprocessableEntityException('El viaje ya ha sido cancelado')
		}

		if (travel.status !== TravelStatus.NOT_STARTED) {
			throw new UnprocessableEntityException(
				'No se puede cancelar el viaje porque ya ha comenzado'
			)
		}

		await this.travelsRepository.update(
			{ id: travel.id },
			{
				status: TravelStatus.CANCELLED
			}
		)

		await Promise.all(
			travel.rides.map(async (ride) => {
				//! don't do this at home kids
				//TODO: test that this does not change the status of already cancelled rides
				try {
					await this.ridesService.cancelRequest(
						{
							where: {
								id: ride.id,
								travelCancelType: undefined,
								isAccepted: true
							}
						},
						{
							travelCancelType: TravelCancelType.DRIVER_DENIAL,
							reason
						}
					)
				} catch (_) {}
			})
		)
	}

	//TODO: this should use transactions, and many more things lol
	async complete({ travelId, rides }: CompleteDto) {
		//biome-ignore lint/style/noNonNullAssertion: Already validated
		const travel = (await this.travelsRepository.findOne({
			where: {
				id: travelId
			},
			relations: { rides: true }
		}))!

		for (const ride of rides) {
			if (!travel.rides.some((r) => ride.rideId === r.id)) {
				throw new NotFoundException('Travel not found')
			}
		}

		if (travel.status !== TravelStatus.IN_PROGRESS) {
			throw new UnprocessableEntityException('El viaje no ha comenzado')
		}

		await this.travelsRepository.update(
			{ id: travel.id },
			{
				status: TravelStatus.COMPLETED,
				arrivalTime: DateTime.now()
			}
		)

		await Promise.all(
			rides.map(async (ride) => {
				await this.ridesService.driverComplete(ride)
			})
		)
	}

	async getUserUnfinishedTravel(userId: User['id']) {
		const travel = await this.travelsRepository.findOne({
			where: {
				vehicle: { driver: { id: userId } },
				status: Or(
					Equal(TravelStatus.NOT_STARTED),
					Equal(TravelStatus.IN_PROGRESS)
				)
			}
		})

		if (travel) {
			return {
				isIn: true,
				payload: { type: 'travel', id: travel.id, status: travel.status }
			}
		}
		return {
			isIn: false,
			payload: null
		}
	}
}
