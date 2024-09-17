import { MemoryStorageFile, UploadedFile } from '@blazity/nest-file-fastify'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Patch,
	Req,
	UseInterceptors
} from '@nestjs/common'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { ImageInterceptor } from '~/shared/files-upload/images/image.interceptor'
import { ProfileDto } from './dto/profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { ProfileService } from './profile.service'

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@HttpCode(200)
	@Get('me')
	async findMe(
		@Req() req: FastifyRequest & { userId: string }
	): Promise<ProfileDto> {
		const userId = req['userId']

		return await this.profileService.getUserProfile(userId)
	}

	@HttpCode(200)
	@Patch('me')
	@UseInterceptors(ImageInterceptor('profilePic'))
	@ApiConsumes('multipart/form-data')
	async updateMe(
		@Req() req: FastifyRequest & { userId: string },
		@Body() updateProfileDto: UpdateProfileDto,
		@UploadedFile() profilePic?: MemoryStorageFile
	) {
		const userId = req['userId']

		updateProfileDto.profilePic = profilePic

		return await this.profileService.updateUserProfile(userId, updateProfileDto)
	}
}
