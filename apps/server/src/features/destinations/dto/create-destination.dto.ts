import { IsNumber, IsString, Max, Min } from 'class-validator'
import {
	MAX_LATITUDE,
	MAX_LONGITUDE,
	MIN_LATITUDE,
	MIN_LONGITUDE
} from '~/shared/constants'

export class CreateDestinationDto {
	@IsString()
	name: string

	@IsNumber()
	@Max(MAX_LATITUDE)
	@Min(MIN_LATITUDE)
	latitude: number

	@IsNumber()
	@Max(MAX_LONGITUDE)
	@Min(MIN_LONGITUDE)
	longitude: number
}
