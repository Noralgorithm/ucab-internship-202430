import { MemoryStorageFile, UploadedFile } from '@blazity/nest-file-fastify'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UseInterceptors
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { ImageInterceptor } from '~/shared/files-upload/images/image.interceptor'
import { MailingService } from '~/shared/mailing/mailing.service'
import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { RequestSignUpDto } from './dto/request-sign-up.dto'
import { RetrieveSignUpParamsDto } from './dto/retrieve-sign-up-params.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpRequestResponseDto } from './dto/sign-up-request-response.dto'
import { SignUpDto } from './dto/sign-up.dto'

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly mailingService: MailingService,
		private readonly configService: ConfigService
	) {}

	@HttpCode(200)
	@Get('retrieve-sign-up-request/:id')
	async retrieveSignUpRequest(
		@Param() params: RetrieveSignUpParamsDto
	): Promise<SignUpRequestResponseDto> {
		const signUpRequest = await this.authService.getSignUpRequest(params.id)

		return SignUpRequestResponseDto.from(signUpRequest)
	}

	@HttpCode(200)
	@Patch('request-sign-up')
	async requestSignUp(@Body() requestSignUpDto: RequestSignUpDto) {
		const signUpRequest = await this.authService.requestSignUp(requestSignUpDto)

		//TODO: send mail using mjml template
		await this.mailingService.sendMailWithHtml({
			to: signUpRequest.email,
			subject: 'Confirmación de registro en Movic 🚗',
			html: `<p>Para confirmar tu registro, accede al siguiente enlace: ${this.configService.get('CLIENT_URL')}/r?i=${signUpRequest.id}</p>`
		})

		// await this.mailingService.sendMailWithTemplate({
		// 	to: signUpRequest.email,
		// 	subject: 'Confirmación de registro en Movic 🚗',
		// 	templatePath: 'src/shared/templates/confirm-email.template.mjml',
		// 	templateType: 'mjml',
		// 	altText: 'sexo'
		// })

		return 'Confirmación enviada con éxito'
	}

	@HttpCode(201)
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

	@HttpCode(200)
	@Post('sign-in')
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto)
	}
}
