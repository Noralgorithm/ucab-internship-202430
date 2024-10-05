import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsDefined,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsString,
	Matches,
	Min,
	ValidateNested
} from 'class-validator'
import { MIN_DISTANCE } from '~/shared/constants'
import { Route } from '../types'
import { GeoJsonLineStringDto } from './geo-json-line-string.dto'

export class RouteDto implements Route {
	@IsString()
	description: string

	@Min(MIN_DISTANCE)
	@IsNumber()
	distance: number

	@ApiProperty({ pattern: '^[0-9]+(\\.[0-9]{1,9})?s$' })
	@Matches(/^[0-9]+(\.[0-9]{1,9})?s$/, {
		message:
			'La duración debe ser una cadena de texto que represente un número, con hasta 9 decimales, seguido de una "s"'
	})
	@IsString()
	duration: string

	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => GeoJsonLineStringDto)
	polyline: GeoJsonLineStringDto
}
