import { Module } from '@nestjs/common'
import { RoutesModule } from '../types'
import { GoogleMapsRoutesController } from './google-maps-routes.controller'
import { GoogleMapsRoutesService } from './google-maps-routes.service'

@Module({
	controllers: [GoogleMapsRoutesController],
	providers: [GoogleMapsRoutesService]
})
export class GoogleMapsRoutesModule implements RoutesModule {}
