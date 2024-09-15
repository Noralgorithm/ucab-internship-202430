import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { DestinationsController } from './destinations.controller'
import { DestinationsService } from './destinations.service'
import { Destination } from './entities/destination.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Destination, User])],
	controllers: [DestinationsController],
	providers: [DestinationsService]
})
export class DestinationsModule {}
