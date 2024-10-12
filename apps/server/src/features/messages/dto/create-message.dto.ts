import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsUUID } from 'class-validator'
import { Ride } from '~/features/rides/entities/ride.entity'
import { Exists } from '~/shared/validators/exists.validator'

export class CreateMessageDto {
	@ApiProperty({ example: false })
	@IsBoolean()
	content: string

	@Exists({ entity: Ride, key: 'id' })
	@IsUUID(4)
	@IsString()
	rideId: ['id']
}
