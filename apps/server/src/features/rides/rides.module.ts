import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Ride } from './entities/ride.entity'
import { RidesController } from './rides.controller'
import { RidesService } from './rides.service'

@Module({
	imports: [TypeOrmModule.forFeature([Ride, User])],
	controllers: [RidesController],
	providers: [RidesService]
})
export class RidesModule {}