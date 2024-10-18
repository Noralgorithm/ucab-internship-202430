import { IsString, IsUUID } from 'class-validator'
import { Ride } from '~/features/rides/entities/ride.entity'
import { Exists } from '~/shared/validators/exists.validator'

export class FindRideMessagesDto {
	@Exists({ entity: Ride, key: 'id' })
	@IsUUID(4)
	@IsString()
	rideId: Ride['id']
}
