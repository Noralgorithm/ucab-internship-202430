import {
	IsEmail,
	IsEnum,
	IsInt,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsUUID,
	MaxLength,
	MinLength
} from 'class-validator'
import {
	EMAIL_MAX_LENGTH,
	Gender,
	NAME_MAX_LENGTH,
	NAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	UserRole,
	UserType
} from '../users.constants'

export class CreateUserDto {
	@IsUUID()
	id: string

	@MaxLength(NAME_MAX_LENGTH)
	@MinLength(NAME_MIN_LENGTH)
	@IsString()
	firstName: string

	@MaxLength(NAME_MAX_LENGTH)
	@MinLength(NAME_MIN_LENGTH)
	@IsString()
	lastName: string

	@MaxLength(EMAIL_MAX_LENGTH)
	@IsEmail()
	@IsString()
	email: string

	@MaxLength(PASSWORD_MAX_LENGTH)
	@MinLength(PASSWORD_MIN_LENGTH)
	@IsString()
	password: string

	@IsEnum(Gender)
	gender: Gender

	@IsEnum(UserType)
	type: UserType

	@IsInt()
	walkDistance: number

	@IsEnum(UserRole)
	preferredRole: string

	//TODO: recieve file
	profilePic: string

	//TODO: put venezuelan format
	@IsPhoneNumber()
	phoneNumber: string

	//TODO: put venezuelan forma
	@IsPhoneNumber()
	emergencyContactPhoneNumber: string

	@IsOptional()
	isDriver: boolean

	@IsOptional()
	isActive: boolean

	@IsOptional()
	isBlocked: boolean
}
