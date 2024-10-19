import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString } from 'class-validator'
import { TravelCancelType } from '../enums/travel-cancel-type.enum'

export class CancelRequestDto {
	@ApiProperty({ example: 'Example' })
	@IsString()
	reason: string

	@ApiProperty({ example: TravelCancelType.DRIVER_DENIAL })
	@IsEnum(TravelCancelType)
	travelCancelType: TravelCancelType
}