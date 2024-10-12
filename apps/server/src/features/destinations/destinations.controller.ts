import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { DestinationsService } from './destinations.service'
import { CreateDestinationDto } from './dto/create-destination.dto'
import { UpdateDestinationDto } from './dto/update-destination.dto'

@ApiTags('destinations')
@Controller('destinations')
export class DestinationsController {
	constructor(private readonly destinationsService: DestinationsService) {}

	@HttpCode(200)
	@Get('mine')
	async findAll(@CurrentUser() currentUser: User) {
		return this.destinationsService.findByPassenger(currentUser.id)
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.destinationsService.findByDestination(id)
	}

	@HttpCode(201)
	@Post()
	async create(
		@CurrentUser() currentUser: User,
		@Body() createDestinationDto: CreateDestinationDto
	) {
		return this.destinationsService.create(currentUser.id, createDestinationDto)
	}

	@HttpCode(200)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@CurrentUser() currentUser: User,
		@Body() updateDestinationDto: UpdateDestinationDto
	) {
		await this.destinationsService.update(
			id,
			currentUser.id,
			updateDestinationDto
		)

		return 'Destino actualizado con éxito mi pana'
	}

	@HttpCode(200)
	@Delete(':id')
	async remove(@Param('id') id: string, @CurrentUser() currentUser: User) {
		await this.destinationsService.remove(id, currentUser.id)

		return 'Destino eliminado con éxito mi pana'
	}
}
