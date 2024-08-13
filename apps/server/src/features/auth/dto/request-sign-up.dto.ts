import { IsEmail, IsString, MaxLength } from 'class-validator'
import { EMAIL_MAX_LENGTH } from '~/shared/constants'

export class RequestSignUpDto {
	//TODO: exists validator
	//TODO: is ucab or whitelisted email validator
	@MaxLength(EMAIL_MAX_LENGTH)
	@IsEmail()
	@IsString()
	email: string
}
