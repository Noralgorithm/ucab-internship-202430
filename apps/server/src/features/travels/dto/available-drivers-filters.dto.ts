import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator'
import { RouteType } from '~/shared/constants'

export class AvailableDriversFiltersDto {
	@IsBoolean()
	@IsOptional()
	isWomanOnly: boolean

	@IsEnum(RouteType)
	type: RouteType

	@IsNumber()
	@IsOptional()
	lat: string

	@IsNumber()
	@IsOptional()
	lng: string
}
