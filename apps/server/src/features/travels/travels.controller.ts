import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { CreateTravelDto } from './dto/create-travel.dto'
import { UpdateTravelDto } from './dto/update-travel.dto'
import { TravelsService } from './travels.service'

@ApiTags('[WIP] travels')
@Controller('travels')
export class TravelsController {
	constructor(private readonly travelsService: TravelsService) {}

	@Post()
	create(
		@Req() req: FastifyRequest & { userId: string },
		@Body() createTravelDto: CreateTravelDto
	) {
		const userId = req['userId']

		return this.travelsService.create(userId, createTravelDto)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.travelsService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
		return this.travelsService.update(+id, updateTravelDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.travelsService.remove(+id)
	}
}
