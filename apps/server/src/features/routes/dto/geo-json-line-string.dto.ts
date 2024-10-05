import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, Equals, IsArray } from 'class-validator'
import { IsGeoJsonPosition } from '~/shared/validators/is-geo-json-position.validator'
import { GeoJsonLineString, GeoJsonPosition } from '../types'

export class GeoJsonLineStringDto implements GeoJsonLineString {
	@Equals('LineString', {
		message: 'El tipo de geometría debe ser "LineString"'
	})
	type: 'LineString'

	@ApiProperty({
		type: 'array',
		items: {
			type: 'array',
			minItems: 2,
			maxItems: 3,
			items: { type: 'number' }
		},
		minItems: 2,
		example: [
			[58.382, 34.604, 23],
			[58.3816, 34.6037],
			[58.381, 34.603, 12]
		]
	})
	@ArrayMinSize(2, { message: 'Debe tener al menos dos posiciones' })
	@IsGeoJsonPosition({ each: true })
	@IsArray()
	coordinates: Array<GeoJsonPosition>
}
