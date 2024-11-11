import { Type } from 'class-transformer'
import {
	IsArray,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	Max,
	Min,
	ValidateNested
} from 'class-validator'
import { Ride } from '~/features/rides/entities/ride.entity'
import { MAX_STAR_RATING, MIN_STAR_RATING } from '~/shared/constants'
import { Exists } from '~/shared/validators/exists.validator'
import { Travel } from '../entities/travel.entity'

export class CompleteDto {
	@Exists({ entity: Travel, key: 'id', message: 'Travel does not exist' })
	@IsUUID('4')
	@IsString()
	travelId: Travel['id']

	@ValidateNested({ each: true })
	@IsArray()
	@Type(() => CompleteDtoRide)
	rides: Array<CompleteDtoRide>
}

class CompleteDtoRide {
	@Exists({ entity: Ride, key: 'id', message: 'Ride does not exist' })
	@IsUUID('4')
	@IsString()
	rideId: Ride['id']

	@Max(MAX_STAR_RATING)
	@Min(MIN_STAR_RATING)
	@IsNumber()
	driverStarRating: NonNullable<Ride['driverStarRating']>

	@IsString()
	@IsOptional()
	driverCommentAfterRide: Ride['driverCommentAfterRide']
}
