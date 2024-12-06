import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Travel } from '../travels/entities/travel.entity'
import { User } from '../users/entities/user.entity'
import { UsersModule } from '../users/users.module'
import { Vehicle } from './entities/vehicle.entity'
import { VehiclesController } from './vehicles.controller'
import { VehiclesService } from './vehicles.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([Vehicle, User, Travel]),
		JwtModule,
		forwardRef(() => UsersModule)
	],
	controllers: [VehiclesController],
	providers: [VehiclesService],
	exports: [VehiclesService]
})
export class VehiclesModule {}
