import {
	Controller,
	Get,
	HttpCode,
	Req,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { ProfileDto } from './dto/profile.dto'
import { ProfileService } from './profile.service'

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
	constructor(
		private readonly profileService: ProfileService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	@HttpCode(200)
	@Get('me')
	async findMe(@Req() req: FastifyRequest): Promise<ProfileDto> {
		const token = req.headers.authorization?.split('Bearer ')[1]

		if (token == null) {
			throw new UnauthorizedException(
				'No se ha proporcionado un token de autorización'
			)
		}

		const payload = await this.jwtService.verifyAsync(token, {
			secret: this.configService.get('JWT_SECRET')
		})

		if (payload == null) {
			throw new UnauthorizedException(
				'No se ha proporcionado un token de autorización'
			)
		}

		return await this.profileService.getUserProfile(payload['sub'])
	}
}
