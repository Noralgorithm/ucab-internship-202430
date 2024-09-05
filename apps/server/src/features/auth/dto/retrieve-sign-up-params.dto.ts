import { IsString, IsUUID } from 'class-validator'
import { SignUpRequest } from '../entities/sign-up-request.entity'

export class RetrieveSignUpParamsDto {
	@IsUUID(4)
	@IsString()
	id: SignUpRequest['id']
}
