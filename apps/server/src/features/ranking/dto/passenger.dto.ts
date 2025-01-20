import { Type } from 'class-transformer'
import {
	IsDefined,
	IsNotEmptyObject,
	IsObject,
	IsString,
	IsUUID,
	ValidateNested
} from 'class-validator'
import { User } from '~/features/users/entities/user.entity'
import { GeoJsonPointDto } from '~/shared/dto/geo-json-point.dto'
import { Exists } from '~/shared/validators/exists.validator'

export class PassengerDto {
	@Exists({ entity: User, key: 'id', message: 'Passenger not found' })
	@IsUUID(4)
	@IsString()
	id: User['id']

	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => GeoJsonPointDto)
	location: GeoJsonPointDto
}
