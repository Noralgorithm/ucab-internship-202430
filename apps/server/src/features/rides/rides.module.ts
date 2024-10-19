import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from '../messages/entities/message.entity'
import { Travel } from '../travels/entities/travel.entity'
import { TravelsModule } from '../travels/travels.module'
import { User } from '../users/entities/user.entity'
import { Ride } from './entities/ride.entity'
import { RidesController } from './rides.controller'
import { RidesService } from './rides.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([Ride, User, Message, Travel]),
		TravelsModule
	],
	controllers: [RidesController],
	providers: [RidesService],
	exports: [RidesService]
})
export class RidesModule {}
