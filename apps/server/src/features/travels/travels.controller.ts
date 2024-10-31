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
import { User } from '../users/entities/user.entity'
import { AvailableDriversFiltersDto } from './dto/available-drivers-filters.dto'
import { CancelDto } from './dto/cancel.dto'
import { CompleteDto } from './dto/complete.dto'
import { CreateTravelDto } from './dto/create-travel.dto'
import { StartDto } from './dto/start.dto'
import { TravelsService } from './travels.service'

@ApiTags('[WIP] travels')
@Controller('travels')
export class TravelsController {
	constructor(private readonly travelsService: TravelsService) {}

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

		return travel
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
