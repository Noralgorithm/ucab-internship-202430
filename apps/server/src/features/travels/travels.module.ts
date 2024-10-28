import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RidesModule } from '../rides/rides.module'
import { RoutesModule } from '../routes/routes.module'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { VehiclesModule } from '../vehicles/vehicles.module'
import { Travel } from './entities/travel.entity'
import { TravelsController } from './travels.controller'
import { TravelsService } from './travels.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([Travel, Vehicle]),
		VehiclesModule,
		RoutesModule,
		forwardRef(() => RidesModule)
	],
	controllers: [TravelsController],
	providers: [TravelsService],
	exports: [TravelsService]
})
export class TravelsModule {}
