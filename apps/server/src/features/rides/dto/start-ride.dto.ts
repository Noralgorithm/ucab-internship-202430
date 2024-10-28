import { IsString, IsUUID } from 'class-validator'
import { Exists } from '~/shared/validators/exists.validator'
import { Ride } from '../entities/ride.entity'

export class StartRideDto {
	@Exists({ entity: Ride, key: 'id' })
	@IsUUID('4')
	@IsString()
	rideId: Ride['id']
}
