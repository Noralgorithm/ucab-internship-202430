import { Type } from 'class-transformer'
import {
	IsDefined,
	IsNotEmptyObject,
	IsObject,
	ValidateNested
} from 'class-validator'
import { Waypoint } from '../types'
import { LocationDto } from './location.dto'

export class WaypointDto implements Waypoint {
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => LocationDto)
	location: LocationDto
}
