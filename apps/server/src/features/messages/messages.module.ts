import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ride } from '../rides/entities/ride.entity'
import { RidesModule } from '../rides/rides.module'
import { User } from '../users/entities/user.entity'
import { Message } from './entities/message.entity'
import { MessagesController } from './messages.controller'
import { MessagesService } from './messages.service'

@Module({
	imports: [TypeOrmModule.forFeature([Message, User, Ride]), RidesModule],
	controllers: [MessagesController],
	providers: [MessagesService]
})
export class MessagesModule {}
