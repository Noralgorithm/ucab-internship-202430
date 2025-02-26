import { MemoryStorageFile } from '@blazity/nest-file-fastify'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'
import {
	Gender,
	NAME_MAX_LENGTH,
	NAME_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	UserType
} from '~/shared/constants'
import { SignUpRequest } from '../entities/sign-up-request.entity'

export class SignUpDto {
	@MaxLength(NAME_MAX_LENGTH)
	@MinLength(NAME_MIN_LENGTH)
	@IsString()
	firstName: string

	@MaxLength(NAME_MAX_LENGTH)
	@MinLength(NAME_MIN_LENGTH)
	@IsString()
	lastName: string

	@MaxLength(PASSWORD_MAX_LENGTH)
	@MinLength(PASSWORD_MIN_LENGTH)
	@IsString()
	password: string

	@IsEnum(Gender)
	gender: Gender

	@IsEnum(UserType)
	type: UserType

	@ApiProperty({ type: 'string', format: 'binary' })
	profilePic: MemoryStorageFile

	@IsUUID('4')
	@IsString()
	signUpRequestId: SignUpRequest['id']
}
