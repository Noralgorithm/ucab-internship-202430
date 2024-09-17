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
import { CreateRouteDto } from './dto/create-route.dto'
import { UpdateRouteDto } from './dto/update-route.dto'
import { RoutesService } from './routes.service'

@ApiTags('[WIP] routes')
@Controller('routes')
export class RoutesController {
	constructor(private readonly routesService: RoutesService) {}

	@Post()
	create(@Body() createRouteDto: CreateRouteDto) {
		return this.routesService.create(createRouteDto)
	}

	@Get()
	findAll() {
		return this.routesService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.routesService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
		return this.routesService.update(+id, updateRouteDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.routesService.remove(+id)
	}
}
