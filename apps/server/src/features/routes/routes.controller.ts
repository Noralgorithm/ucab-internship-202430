import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UCAB_GUAYANA_LOCATION } from './constants'
import { DriveFromUCABDto } from './dto/drive-from-ucab.dto'
import { DriveToUCABDto } from './dto/drive-to-ucab.dto'
import { RoutesService } from './types'

@ApiTags('[WIP] routes')
@Controller('routes')
export class RoutesController {
	constructor(
		@Inject(RoutesService) private readonly routesService: RoutesService
	) {}

	@Post('drive-from-ucab')
	driveFromUCAB(@Body() driveFromUCABDto: DriveFromUCABDto) {
		const origin = {
			location: UCAB_GUAYANA_LOCATION
		}

		return this.routesService.createDriveRoute(
			origin,
			driveFromUCABDto.destination
		)
	}

	@Post('drive-to-ucab')
	driveToUCAB(@Body() { origin }: DriveToUCABDto) {
		const destination = {
			location: UCAB_GUAYANA_LOCATION
		}

		return this.routesService.createDriveRoute(origin, destination)
	}
}
