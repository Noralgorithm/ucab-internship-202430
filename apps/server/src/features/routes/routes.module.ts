import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileStorageModule } from '~/shared/files-upload/file-storage/file-storage.module'
import { RouteEntity } from './entities/route.entity'
import { GoogleMapsRoutesService } from './google-maps/google-maps-routes.service'
import { RoutesController } from './routes.controller'
import { RoutesService } from './types'

const routesServiceProvider: Provider<RoutesService> = {
	provide: RoutesService,
	useClass: GoogleMapsRoutesService
}

@Module({
	imports: [TypeOrmModule.forFeature([RouteEntity]), FileStorageModule],
	controllers: [RoutesController],
	providers: [routesServiceProvider],
	exports: [routesServiceProvider]
})
export class RoutesModule {}
