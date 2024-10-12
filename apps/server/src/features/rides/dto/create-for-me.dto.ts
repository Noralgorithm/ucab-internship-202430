import { Type } from 'class-transformer'
import {
	IsDefined,
	IsNotEmptyObject,
	IsObject,
	IsString,
	IsUUID,
	ValidateNested
} from 'class-validator'
import { Travel } from '~/features/travels/entities/travel.entity'
import { GeoJsonPointDto } from '~/shared/dto/geo-json-point.dto'
import { Exists } from '~/shared/validators/exists.validator'

export class CreateForMeDto {
	@Exists({ entity: Travel, key: 'id', message: 'Travel not found' })
	@IsUUID(4)
	@IsString()
	travelId: Travel['id']

	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => GeoJsonPointDto)
	point: GeoJsonPointDto
}
