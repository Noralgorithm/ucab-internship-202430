import { IsString, MaxLength } from 'class-validator'
import { User } from '~/features/users/entities/user.entity'
import { EMAIL_MAX_LENGTH } from '~/shared/constants'
import { IsUcabEmail } from '~/shared/validators/is-ucab-email.validator'
import { NotExists } from '~/shared/validators/not-exists.validator'

export class RequestSignUpDto {
	//TODO: is whitelisted email validator
	@NotExists({ entity: User, message: 'El usuario ya existe' })
	@MaxLength(EMAIL_MAX_LENGTH)
	@IsUcabEmail()
	@IsString()
	email: string
}
