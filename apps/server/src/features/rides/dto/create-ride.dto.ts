import { Travel } from '~/features/travels/entities/travel.entity'
import { User } from '~/features/users/entities/user.entity'
import { GeoJsonPointDto } from '~/shared/dto/geo-json-point.dto'

export class CreateRideDto {
	origin: GeoJsonPointDto
	destination: GeoJsonPointDto
	travel: Travel
	passenger: User
}
