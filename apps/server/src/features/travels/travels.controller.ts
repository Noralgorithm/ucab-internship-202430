import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
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

	@Get('ride-requests/:id')
	findRideRequests(@Param('id') id: string) {
		return this.travelsService.findRideRequests({ where: { id: id } })
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.travelsService.findOne({
			where: { id: id },
			relations: ['vehicle']
		})
	}
}
