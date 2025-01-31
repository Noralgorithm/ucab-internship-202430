import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { RidesService } from '../rides/rides.service'
import { User } from '../users/entities/user.entity'
import { AvailableDriversFiltersDto } from './dto/available-drivers-filters.dto'
import { CancelDto } from './dto/cancel.dto'
import { CompleteDto } from './dto/complete.dto'
import { CreateTravelDto } from './dto/create-travel.dto'
import { StartDto } from './dto/start.dto'
import { TravelStatus } from './enums/travel-status.enum'
import { TravelsService } from './travels.service'

@ApiTags('[WIP] travels')
@Controller('travels')
export class TravelsController {
	constructor(
		private readonly travelsService: TravelsService,
		private readonly ridesService: RidesService
	) {}

	@Post()
	create(
		@CurrentUser() currentUser: User,
		@Body() createTravelDto: CreateTravelDto
	) {
		return this.travelsService.create(currentUser.id, createTravelDto)
	}

	@Get('available-drivers')
	getAvailableDrivers(
		@Query() availableDriversFiltersDto: AvailableDriversFiltersDto,
		@CurrentUser() currentUser: User
	) {
		return this.travelsService.getAvailableDrivers(
			availableDriversFiltersDto,
			currentUser
		)
	}

	@Get(':id/ride-requests')
	async findRideRequests(
		@Param('id') id: string,
		@CurrentUser() currentUser: User
	) {
		await this.travelsService.findOne({
			where: { id, vehicle: { driver: { id: currentUser.id } } }
		})

		return await this.travelsService.findRideRequests({ where: { id: id } })
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const travel = await this.travelsService.findOne({
			where: { id: id },
			relations: ['vehicle', 'vehicle.driver', 'rides', 'rides.passenger']
		})

		const ridesWithRating = await Promise.all(
			travel.rides.map(async (ride) => {
				const ratedUser: User & { rating: number; reviewsQuantity: number } = {
					...ride.passenger,
					rating: ride.passenger.totalStarRating ?? 0,
					reviewsQuantity: ride.passenger.totalReviewsQuantity
				}

				return {
					...ride,
					passenger: ratedUser
				}
			})
		)

		if (travel.status === TravelStatus.IN_PROGRESS) {
			travel['passengersRelevantLocations'] =
				await this.travelsService.getTravelPassengersRelevantLocations(
					travel.id
				)
		}

		return {
			...travel,
			rides: ridesWithRating
		}
	}

	@Patch('start')
	async start(@Body() startDto: StartDto, @CurrentUser() currentUser: User) {
		await this.travelsService.findOne({
			where: {
				id: startDto.travelId,
				vehicle: { driver: { id: currentUser.id } }
			}
		})

		this.travelsService.start(startDto)

		return 'Viaje comenzado'
	}

	@Patch('cancel')
	async cancel(@Body() cancelDto: CancelDto, @CurrentUser() currentUser: User) {
		await this.travelsService.findOne({
			where: {
				id: cancelDto.travelId,
				vehicle: { driver: { id: currentUser.id } }
			}
		})

		this.travelsService.cancel(cancelDto)

		return 'Viaje cancelado'
	}

	@Patch('complete')
	async complete(
		@Body() completeDto: CompleteDto,
		@CurrentUser() currentUser: User
	) {
		await this.travelsService.findOne({
			where: {
				id: completeDto.travelId,
				vehicle: { driver: { id: currentUser.id } }
			}
		})

		this.travelsService.complete(completeDto)

		return 'Viaje finalizado'
	}
}
