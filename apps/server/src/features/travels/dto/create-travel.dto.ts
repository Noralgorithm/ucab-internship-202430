import { ApiProperty } from '@nestjs/swagger'
import {
	IsBoolean,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	IsUUID
} from 'class-validator'
import { RouteEntity } from '~/features/routes/entities/route.entity'
import { Vehicle } from '~/features/vehicles/entities/vehicle.entity'
import { RouteType } from '~/shared/constants'
import { Exists } from '~/shared/validators/exists.validator'
import { TravelStatus } from '../enums/travel-status.enum'

export class CreateTravelDto {
	@ApiProperty({ example: false })
	@IsBoolean()
	forWomen: boolean

	@ApiProperty({ example: RouteType.TO_UCAB })
	@IsEnum(RouteType)
	@IsNotEmpty()
	type: RouteType

	@ApiProperty({ example: TravelStatus.NOT_STARTED })
	@IsEnum(TravelStatus)
	@IsNotEmpty()
	status: TravelStatus

	@IsPositive()
	@IsInt()
	@IsNumber()
	availableSeatQuantity: number

	@Exists({ entity: Vehicle, key: 'id' })
	@IsUUID(4)
	@IsString()
	vehicleId: Vehicle['id']

	@Exists({ entity: RouteEntity, key: 'id' })
	@IsUUID(4)
	@IsString()
	routeId: RouteEntity['id']
}
