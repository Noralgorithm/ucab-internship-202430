import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SignUpRequest } from './entities/sign-up-request.entity'

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
		TypeOrmModule.forFeature([SignUpRequest, User])
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
