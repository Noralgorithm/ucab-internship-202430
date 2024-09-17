import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RoutesController } from '../types'
import { GoogleMapsRoutesService } from './google-maps-routes.service'

@ApiTags('routes')
@Controller('routes')
export class GoogleMapsRoutesController implements RoutesController {
	constructor(private readonly routesService: GoogleMapsRoutesService) {}

	// @Get('daikone-route')
	// getDaikoneRoute() {
	// 	return this.routesService.createDriveRoute(
	// 		{ location: { coords: { latitude: 8.2853787, longitude: -62.7213676 } } },
	// 		{ location: { coords: { latitude: 8.296381, longitude: -62.71271 } } }
	// 	)
	// }
}
