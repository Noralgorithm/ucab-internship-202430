import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'
import { Ride } from '../entities/ride.entity'
import { TravelCancelType } from '../enums/travel-cancel-type.enum'

export class AnswerRequestDto {
	@ApiProperty({ example: false })
	@IsBoolean()
	isAccepted: boolean

	@IsString()
	@IsOptional()
	cancellationReason?: Ride['cancellationReason']

	@IsEnum(TravelCancelType)
	@IsOptional()
	@ApiProperty({
		example: `${TravelCancelType.DRIVER_DENIAL} || ${TravelCancelType.PASSENGER_DENIAL}`
	})
	travelCancelType?: Ride['travelCancelType']
}
