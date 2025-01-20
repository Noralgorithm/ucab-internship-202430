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
import { PassengerDto } from './passenger.dto'

export class RankingDto {
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => PassengerDto)
	passenger: PassengerDto

	@IsEnum(RouteType)
	routeType: RouteType

	@IsBoolean()
	womenOnly: boolean
}
