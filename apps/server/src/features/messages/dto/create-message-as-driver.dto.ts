import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsUUID } from 'class-validator'
import { Ride } from '~/features/rides/entities/ride.entity'
import { User } from '~/features/users/entities/user.entity'
import { Exists } from '~/shared/validators/exists.validator'

export class CreateMessageAsDriverDto {
	@ApiProperty({ example: false })
	@IsBoolean()
	content: string

	@Exists({ entity: Ride, key: 'id' })
	@IsUUID(4)
	@IsString()
	rideId: Ride['id']

	@Exists({ entity: User, key: 'id' })
	@IsUUID(4)
	@IsString()
	passengerId: User['id']
}
