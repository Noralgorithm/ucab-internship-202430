import { IsBooleanString, IsEnum, IsOptional, IsString } from 'class-validator'
import { RouteType } from '~/shared/constants'

export class AvailableDriversFiltersDto {
	@IsBooleanString()
	@IsOptional()
	isWomanOnly: boolean

	@IsEnum(RouteType)
	type: RouteType

	@IsString()
	@IsOptional()
	lat: string

	@IsString()
	@IsOptional()
	lng: string
}
