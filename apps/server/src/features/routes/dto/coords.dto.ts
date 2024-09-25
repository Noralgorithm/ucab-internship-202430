import { IsLatitude, IsLongitude, IsNumber } from 'class-validator'
import { Coords } from '../types'

export class CoordsDto implements Coords {
	@IsLatitude()
	@IsNumber()
	latitude: number

	@IsLongitude()
	@IsNumber()
	longitude: number
}
