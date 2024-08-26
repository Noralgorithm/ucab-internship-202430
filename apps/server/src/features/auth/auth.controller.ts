import { MemoryStorageFile, UploadedFile } from '@blazity/nest-file-fastify'
import {
	Body,
	Controller,
	HttpCode,
	Patch,
	Post,
	UseInterceptors
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { ImageInterceptor } from '~/shared/files-upload/images/image.interceptor'
import { MailingService } from '~/shared/mailing/mailing.service'
import { AuthService } from './auth.service'
import { RequestSignUpDto } from './dto/request-sign-up.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly mailingService: MailingService,
		private readonly configService: ConfigService
	) {}

	@HttpCode(204)
	@Patch('request-sign-up')
	async requestSignUp(@Body() requestSignUpDto: RequestSignUpDto) {
		const signUpRequest = await this.authService.requestSignUp(requestSignUpDto)

		//TODO: send mail using mjml template
		await this.mailingService.sendMailWithHtml({
			to: signUpRequest.email,
			subject: 'Confirmación de registro en Movic 🚗',
			html: `<p>Para confirmar tu registro, accede al siguiente enlace: ${this.configService.get('CLIENT_URL')}/r?i=${signUpRequest.id}</p>`
		})
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
