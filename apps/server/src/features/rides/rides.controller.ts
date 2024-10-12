import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateRideDto } from './dto/create-ride.dto'
import { UpdateRideDto } from './dto/update-ride.dto'
import { RidesService } from './rides.service'

@ApiTags('[WIP] rides')
@Controller('rides')
export class RidesController {
	constructor(private readonly ridesService: RidesService) {}

	@Post()
	create(@Body() createRideDto: CreateRideDto) {
		return this.ridesService.create(createRideDto)
	}

	@Get()
	findAll() {
		return this.ridesService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.ridesService.findOne({ where: { id: id } })
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRideDto: UpdateRideDto) {
		return this.ridesService.update(+id, updateRideDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ridesService.remove(+id)
	}
}
