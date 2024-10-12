import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
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
		RoutesModule
	],
	controllers: [TravelsController],
	providers: [TravelsService]
})
export class TravelsModule {}
