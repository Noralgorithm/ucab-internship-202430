import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileStorageModule } from '~/shared/files-upload/file-storage/file-storage.module'
import { MailingModule } from '~/shared/mailing/mailing.module'
import { User } from '../users/entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SignUpRequest } from './entities/sign-up-request.entity'
import { AuthGuard } from './guards/auth.guard'
import { RolesGuard } from './guards/roles.guard'

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					algorithm: 'HS384'
				},
				verifyOptions: {
					algorithms: ['HS384']
				}
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forFeature([SignUpRequest, User]),
		FileStorageModule,
		MailingModule
	],
	controllers: [AuthController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		},
		AuthService
	]
})
export class AuthModule {}
