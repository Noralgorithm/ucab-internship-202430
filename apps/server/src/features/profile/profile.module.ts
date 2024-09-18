import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileStorageModule } from '~/shared/files-upload/file-storage/file-storage.module'
import { AuthMiddleware } from '../auth/middlewares/auth.middleware'
import { User } from '../users/entities/user.entity'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
	imports: [TypeOrmModule.forFeature([User]), JwtModule, FileStorageModule],
	controllers: [ProfileController],
	providers: [ProfileService]
})
export class ProfileModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.forRoutes({ path: 'profile/me', method: RequestMethod.GET })
	}
}
