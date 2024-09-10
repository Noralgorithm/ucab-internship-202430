import { MemoryStorageFile } from '@blazity/nest-file-fastify'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsEnum,
	IsInt,
	IsNumber,
	IsOptional,
	IsPhoneNumber,
	IsPositive,
	IsString,
	Max,
	Min
} from 'class-validator'
import {
	UserRole,
	WALK_DISTANCE_MAX_VALUE,
	WALK_DISTANCE_MIN_VALUE
} from '~/shared/constants'

export class UpdateProfileDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	@IsOptional()
	profilePic?: MemoryStorageFile

	@IsEnum(UserRole)
	@IsOptional()
	preferredRole?: UserRole

	@IsPositive()
	@Max(WALK_DISTANCE_MAX_VALUE)
	@Min(WALK_DISTANCE_MIN_VALUE)
	@IsInt()
	@IsNumber()
	@Type(() => Number)
	@IsOptional()
	walkDistance?: number

	//TODO: put venezuelan format
	@IsPhoneNumber('VE')
	@IsString()
	@IsOptional()
	phoneNumber?: string

	//TODO: put venezuelan forma
	@IsPhoneNumber('VE')
	@IsString()
	@IsOptional()
	emergencyContactPhoneNumber?: string
}
