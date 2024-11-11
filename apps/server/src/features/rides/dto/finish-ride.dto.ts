import { Type } from 'class-transformer'
import {
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	IsUUID,
	Max,
	Min,
	ValidateNested
} from 'class-validator'
import { MAX_STAR_RATING, MIN_STAR_RATING } from '~/shared/constants'
import { GeoJsonPointDto } from '~/shared/dto/geo-json-point.dto'
import { Exists } from '~/shared/validators/exists.validator'
import { Ride } from '../entities/ride.entity'

export class FinishRideDto {
	@Exists({ entity: Ride, key: 'id' })
	@IsUUID('4')
	@IsString()
	rideId: Ride['id']

	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => GeoJsonPointDto)
	@IsOptional()
	dropOff?: GeoJsonPointDto

	@Max(MAX_STAR_RATING)
	@Min(MIN_STAR_RATING)
	@IsNumber()
	passengerStarRating: NonNullable<Ride['passengerStarRating']>

	@IsString()
	@IsOptional()
	passengerCommentAfterRide: Ride['passengerCommentAfterRide']
}
