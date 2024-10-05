import { MemoryStorageFile, UploadedFile } from '@blazity/nest-file-fastify'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Patch,
	UseInterceptors
} from '@nestjs/common'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { ImageInterceptor } from '~/shared/files-upload/images/image.interceptor'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
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
		@CurrentUser('id') currentUserId: User['id']
	): Promise<ProfileDto> {
		return await this.profileService.getUserProfile(currentUserId)
	}

	@HttpCode(200)
	@Patch('me')
	@UseInterceptors(ImageInterceptor('profilePic'))
	@ApiConsumes('multipart/form-data')
	async updateMe(
		@CurrentUser('id') currentUserId: User['id'],
		@Body() updateProfileDto: UpdateProfileDto,
		@UploadedFile() profilePic?: MemoryStorageFile
	) {
		updateProfileDto.profilePic = profilePic

		return await this.profileService.updateUserProfile(
			currentUserId,
			updateProfileDto
		)
	}
}
