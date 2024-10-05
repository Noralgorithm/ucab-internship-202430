import { Type } from 'class-transformer'
import {
	IsDefined,
	IsEnum,
	IsNotEmptyObject,
	IsObject,
	IsString,
	ValidateNested
} from 'class-validator'
import { RouteType } from '~/shared/constants'
import { RouteDto } from './route.dto'

export class SaveMineRouteDto {
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => RouteDto)
	route: RouteDto

	@IsEnum(RouteType)
	type: RouteType

	@IsString()
	name: string
}
