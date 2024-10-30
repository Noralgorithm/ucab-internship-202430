import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
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
	getAvailableDrivers(@CurrentUser() currentUser: User) {
		return this.travelsService.getAvailableDrivers(currentUser)
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
	start(@Body() startDto: StartDto, @CurrentUser() currentUser: User) {
		return this.travelsService.start(startDto, currentUser)
	}

	@Patch('cancel')
	cancel(@Body() cancelDto: CancelDto, @CurrentUser() currentUser: User) {
		return this.travelsService.cancel(cancelDto, currentUser)
	}

	@Patch('complete')
	complete(@Body() completeDto: CompleteDto, @CurrentUser() currentUser: User) {
		return this.travelsService.complete(completeDto, currentUser)
	}
}
