import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'
import { Ride } from '../entities/ride.entity'

export class AnswerRequestDto {
	@ApiProperty({ example: false })
	@IsBoolean()
	isAccepted: boolean

	@IsString()
	@IsOptional()
	cancellationReason?: Ride['cancellationReason']
}
