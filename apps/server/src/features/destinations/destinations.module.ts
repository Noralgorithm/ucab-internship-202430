import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthMiddleware } from '../auth/middlewares/auth.middleware'
import { User } from '../users/entities/user.entity'
import { UsersModule } from '../users/users.module'
import { DestinationsController } from './destinations.controller'
import { DestinationsService } from './destinations.service'
import { Destination } from './entities/destination.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([Destination, User]),
		UsersModule,
		JwtModule
	],
	controllers: [DestinationsController],
	providers: [DestinationsService]
})
export class DestinationsModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.forRoutes(
				{ path: 'destinations/mine', method: RequestMethod.GET },
				{ path: 'destinations', method: RequestMethod.POST },
				{ path: 'destinations/:id', method: RequestMethod.PATCH },
				{ path: 'destinations/:id', method: RequestMethod.DELETE }
			)
	}
}
