import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsDefined,
	IsNotEmptyObject,
	IsObject,
	IsOptional,
	ValidateNested
} from 'class-validator'
import { WaypointDto } from './waypoint.dto'

export class DriveToUCABDto {
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => WaypointDto)
	origin: WaypointDto

	@IsBoolean()
	@IsOptional()
	alternativeRoutes?: boolean
}
