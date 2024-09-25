import { Type } from 'class-transformer'
import {
	IsDefined,
	IsNotEmptyObject,
	IsObject,
	ValidateNested
} from 'class-validator'
import { WaypointDto } from './waypoint.dto'

export class DriveFromUCABDto {
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => WaypointDto)
	destination: WaypointDto
}
