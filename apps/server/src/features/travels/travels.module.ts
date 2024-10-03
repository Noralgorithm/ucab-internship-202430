import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { VehiclesModule } from '../vehicles/vehicles.module'
import { Travel } from './entities/travel.entity'
import { TravelsController } from './travels.controller'
import { TravelsService } from './travels.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([Travel, Vehicle, User]),
		VehiclesModule
		// RoutesModule
	],
	controllers: [TravelsController],
	providers: [TravelsService]
})
export class TravelsModule {}
