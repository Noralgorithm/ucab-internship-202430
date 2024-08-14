import { MemoryStorageFile, UploadedFile } from '@blazity/nest-file-fastify'
import { Body, Controller, Patch, Post, UseInterceptors } from '@nestjs/common'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { ImageInterceptor } from '~/shared/files-upload/images/image.interceptor'
import { AuthService } from './auth.service'
import { RequestSignUpDto } from './dto/request-sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Patch('request-sign-up')
	requestSignUp(@Body() requestSignUpDto: RequestSignUpDto) {
		//TODO: send signUpRequest email
		const signUpRequestId = this.authService.requestSignUp(requestSignUpDto)

		return signUpRequestId
	}

	@Post('sign-up')
	@UseInterceptors(ImageInterceptor('profilePic'))
	@ApiConsumes('multipart/form-data')
	signUp(
		@Body() signUpDto: SignUpDto,
		@UploadedFile() profilePic: MemoryStorageFile
	) {
		signUpDto.profilePic = profilePic
		return this.authService.signUp(signUpDto)
	}

	@Post('sign-in')
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto)
	}
}
