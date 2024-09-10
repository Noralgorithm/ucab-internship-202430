import { MemoryStorageFile, UploadedFile } from '@blazity/nest-file-fastify'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Patch,
	Req,
	UnauthorizedException,
	UseInterceptors
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { ImageInterceptor } from '~/shared/files-upload/images/image.interceptor'
import { ProfileDto } from './dto/profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
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

		const userId = payload['sub']

		return await this.profileService.getUserProfile(userId)
	}

	@HttpCode(200)
	@Patch('me')
	@UseInterceptors(ImageInterceptor('profilePic'))
	@ApiConsumes('multipart/form-data')
	async updateMe(
		@Req() req: FastifyRequest,
		@Body() updateProfileDto: UpdateProfileDto,
		@UploadedFile() profilePic?: MemoryStorageFile
	) {
		//TODO: extract this logic to a middleware/service/decorator/interceptor
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

		const userId = payload['sub']

		updateProfileDto.profilePic = profilePic

		return await this.profileService.updateUserProfile(userId, updateProfileDto)
	}
}
