import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import {
	EMAIL_MAX_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH
} from '~/shared/constants'

export class SignInDto {
	//TODO: exists validator
	//TODO: is ucab or whitelisted email validator
	@MaxLength(EMAIL_MAX_LENGTH)
	@IsEmail()
	@IsString()
	email: string

	//TODO: create IsStrongPassword validator
	@MaxLength(PASSWORD_MAX_LENGTH)
	@MinLength(PASSWORD_MIN_LENGTH)
	@IsString()
	password: string
}
