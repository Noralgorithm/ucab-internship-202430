import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsDefined,
	IsEnum,
	IsNotEmptyObject,
	IsObject,
	ValidateNested
} from 'class-validator'
import { RouteType } from '~/shared/constants'
import { GeoJsonPointDto } from '~/shared/dto/geo-json-point.dto'

export class RankDto {
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => GeoJsonPointDto)
	passengerLocation: GeoJsonPointDto

	@IsEnum(RouteType)
	routeType: RouteType

	@IsBoolean()
	womenOnly: boolean
}
