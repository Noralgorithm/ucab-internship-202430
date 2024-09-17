import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Req
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { DestinationsService } from './destinations.service'
import { CreateDestinationDto } from './dto/create-destination.dto'
import { UpdateDestinationDto } from './dto/update-destination.dto'

@ApiTags('[WIP] destinations')
@Controller('destinations')
export class DestinationsController {
	constructor(private readonly destinationsService: DestinationsService) {}

	@HttpCode(201)
	@Post()
	async create(
		@Req() req: FastifyRequest & { userId: string },
		@Body() createDestinationDto: CreateDestinationDto
	) {
		const userId = req['userId']

		return this.destinationsService.create(userId, createDestinationDto)
	}

	@HttpCode(200)
	@Get('mine')
	async findAll(@Req() req: FastifyRequest & { userId: string }) {
		const userId = req['userId']

		return this.destinationsService.findByPassenger(userId)
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.destinationsService.findByDestination(id)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateDestinationDto: UpdateDestinationDto
	) {
		return this.destinationsService.update(+id, updateDestinationDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.destinationsService.remove(+id)
	}
}
