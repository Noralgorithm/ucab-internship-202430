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
import { Route } from '~/features/routes/entities/route.entity'
import { Vehicle } from '~/features/vehicles/entities/vehicle.entity'
import { RouteType } from '~/shared/constants'
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

	// @IsPositive()
	// @IsInt()
	// @IsNumber()
	// vehicleId: Vehicle['internalId']
	@IsUUID(4)
	@IsString()
	vehicleId: Vehicle['id']

	@IsUUID(4)
	@IsString()
	routeId: Route['id']
}
