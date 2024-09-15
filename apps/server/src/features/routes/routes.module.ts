import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Route } from './entities/route.entity'
import { RoutesController } from './routes.controller'
import { RoutesService } from './routes.service'

@Module({
	imports: [TypeOrmModule.forFeature([Route, User])],
	controllers: [RoutesController],
	providers: [RoutesService]
})
export class RoutesModule {}
