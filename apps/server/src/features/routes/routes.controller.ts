import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { UCAB_GUAYANA_LOCATION } from './constants'
import { DriveFromUCABDto } from './dto/drive-from-ucab.dto'
import { DriveToUCABDto } from './dto/drive-to-ucab.dto'
import { RouteDto } from './dto/route.dto'
import { SaveMineRouteDto } from './dto/save-mine-route.dto'
import { RoutesService } from './types'

@ApiTags('[WIP] routes')
@Controller('routes')
export class RoutesController {
	constructor(
		@Inject(RoutesService) private readonly routesService: RoutesService
	) {}

	@Post('drive-from-ucab')
	driveFromUCAB(
		@Body() { destination, alternativeRoutes }: DriveFromUCABDto
	): Promise<Array<RouteDto>> {
		const origin = {
			location: UCAB_GUAYANA_LOCATION
		}

		return this.routesService.createDriveRoute({
			origin,
			destination,
			alternativeRoutes
		})
	}

	@Post('drive-to-ucab')
	driveToUCAB(
		@Body() { origin, alternativeRoutes }: DriveToUCABDto
	): Promise<Array<RouteDto>> {
		const destination = {
			location: UCAB_GUAYANA_LOCATION
		}

		return this.routesService.createDriveRoute({
			origin,
			destination,
			alternativeRoutes
		})
	}

	@Post('mine')
	saveMyRoute(
		@Body() { route, name, type }: SaveMineRouteDto,
		@CurrentUser() currentUser: User
	) {
		//TODO: validate that user is driver
		return this.routesService.saveUserRoute({
			route,
			name,
			type,
			user: currentUser
		})
	}

	@Get('mine')
	getMyRoutes(@CurrentUser() currentUser: User) {
		//TODO: validate that user is driver
		return this.routesService.findAll({
			where: { user: { id: currentUser.id } }
		})
	}
}
