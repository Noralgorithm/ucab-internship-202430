import { Type } from 'class-transformer'
import {
	IsDefined,
	IsEnum,
	IsNotEmptyObject,
	IsObject,
	IsString,
	IsUUID,
	ValidateNested
} from 'class-validator'
import { User } from '~/features/users/entities/user.entity'
import { RouteType } from '~/shared/constants'
import { Exists } from '~/shared/validators/exists.validator'
import { WaypointDto } from './waypoint.dto'

export class DriveFromUCABDto {
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => WaypointDto)
	destination: WaypointDto

	@IsEnum(RouteType)
	type: RouteType

	@IsString()
	name: string

	@Exists({ entity: User, key: 'id' })
	@IsUUID(4)
	@IsString()
	userId: string
}
