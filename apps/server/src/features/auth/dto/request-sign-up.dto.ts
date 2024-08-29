import { IsEmail, IsString, MaxLength } from 'class-validator'
import { User } from '~/features/users/entities/user.entity'
import { EMAIL_MAX_LENGTH } from '~/shared/constants'
import { NotExists } from '~/shared/validators/not-exists.validator'

export class RequestSignUpDto {
	//TODO: is ucab or whitelisted email validator
	@NotExists({ entity: User, message: 'El usuario ya existe' })
	@MaxLength(EMAIL_MAX_LENGTH)
	@IsEmail()
	@IsString()
	email: string
}
