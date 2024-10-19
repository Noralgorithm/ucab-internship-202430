import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { TravelStatus } from '../enums/travel-status.enum'

export class ChangeTravelStatusDto {
	@ApiProperty({ example: TravelStatus.IN_PROGRESS })
	@IsEnum(TravelStatus)
	@IsNotEmpty()
	status: TravelStatus
}
