import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Destination } from '../destinations/entities/destination.entity'
import { Ride } from '../rides/entities/ride.entity'
import { Route } from '../routes/entities/route.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Vehicle, Destination, Route, Ride])
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
