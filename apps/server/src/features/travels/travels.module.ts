import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { Travel } from './entities/travel.entity'
import { TravelsController } from './travels.controller'
import { TravelsService } from './travels.service'

@Module({
	imports: [TypeOrmModule.forFeature([Travel, Vehicle])],
	controllers: [TravelsController],
	providers: [TravelsService]
})
export class TravelsModule {}
