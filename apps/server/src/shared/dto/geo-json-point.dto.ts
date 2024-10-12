import { ApiProperty } from '@nestjs/swagger'
import { Equals } from 'class-validator'
import { GeoJsonPosition } from '~/features/routes/types'
import { GeoJsonPoint } from '../types'
import { IsGeoJsonPosition } from '../validators/is-geo-json-position.validator'

const point = 'Point'

export class GeoJsonPointDto implements GeoJsonPoint {
	@Equals(point, {
		message: `El tipo de geometría debe ser "${point}"`
	})
	type: typeof point

	@ApiProperty({
		type: 'array',
		minItems: 2,
		maxItems: 3,
		items: { type: 'number' }
	})
	@IsGeoJsonPosition()
	coordinates: GeoJsonPosition
}
