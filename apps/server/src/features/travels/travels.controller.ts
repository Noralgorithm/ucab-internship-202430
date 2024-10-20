import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { ChangeTravelStatusDto } from './dto/change-travel-status.dto'
import { CreateTravelDto } from './dto/create-travel.dto'
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
	getAvailableDrivers() {
		return this.travelsService.getAvailableDrivers()
	}

	@Get(':id/ride-requests')
	findRideRequests(@Param('id') id: string) {
		return this.travelsService.findRideRequests({ where: { id: id } })
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const travel = await this.travelsService.findOne({
			where: { id: id },
			relations: ['vehicle', 'rides', 'rides.passenger']
		})

		travel.rides = travel.rides.filter((ride) => ride.isAccepted)

		return travel
	}

	@Patch(':id/status')
	changeStatus(
		@Param('id') id: string,
		@Body() changeTravelStatusDto: ChangeTravelStatusDto
	) {
		return this.travelsService.changeStatus(
			{ where: { id: id } },
			changeTravelStatusDto
		)
	}
}
