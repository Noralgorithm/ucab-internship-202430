import { Type } from 'class-transformer'
import {
	IsDefined,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsOptional,
	Max,
	Min,
	ValidateNested
} from 'class-validator'
import { MAX_HEADING, MIN_HEADING } from '~/shared/constants'
import { Location } from '../types'
import { CoordsDto } from './coords.dto'

export class LocationDto implements Location {
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => CoordsDto)
	coords: CoordsDto

	@Max(MAX_HEADING)
	@Min(MIN_HEADING)
	@IsNumber()
	@IsOptional()
	heading?: number
}
