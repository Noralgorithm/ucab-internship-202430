import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { TravelCancelType } from '../enums/travel-cancel-type.enum'

export class CancelRequestDto {
	@ApiProperty({ example: 'Example' })
	@IsString()
	@IsOptional()
	reason?: string

	@ApiProperty({ example: TravelCancelType.DRIVER_DENIAL })
	@IsEnum(TravelCancelType)
	@IsNotEmpty()
	travelCancelType: TravelCancelType
}
