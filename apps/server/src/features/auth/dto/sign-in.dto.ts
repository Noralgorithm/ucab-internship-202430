import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { User } from '~/features/users/entities/user.entity'
import {
	EMAIL_MAX_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH
} from '~/shared/constants'
import { Exists } from '~/shared/validators/exists.validator'

export class SignInDto {
	//TODO: is ucab or whitelisted email validator
	@Exists({
		entity: User,
		message: 'El correo proveído no está asociado a ningún usuario'
	})
	@MaxLength(EMAIL_MAX_LENGTH)
	@IsEmail()
	@IsString()
	@ApiProperty({ example: 'ajrosas.19@est.ucab.edu.ve' })
	email: string

	//TODO: create IsStrongPassword validator
	@MaxLength(PASSWORD_MAX_LENGTH)
	@MinLength(PASSWORD_MIN_LENGTH)
	@IsString()
	@ApiProperty({ example: '123456789' })
	password: string
}
