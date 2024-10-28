import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsBoolean,
	IsDefined,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsPositive,
	IsString,
	IsUUID,
	ValidateNested
} from 'class-validator'
import { RouteDto } from '~/features/routes/dto/route.dto'
import { Vehicle } from '~/features/vehicles/entities/vehicle.entity'
import { RouteType } from '~/shared/constants'
import { Exists } from '~/shared/validators/exists.validator'

export class CreateTravelDto {
	@ApiProperty({ example: false })
	@IsBoolean()
	forWomen: boolean

	@ApiProperty({ example: RouteType.TO_UCAB })
	@IsEnum(RouteType)
	@IsNotEmpty()
	type: RouteType

	@IsPositive()
	@IsInt()
	@IsNumber()
	availableSeatQuantity: number

	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => RouteDto)
	route: RouteDto

	@Exists({ entity: Vehicle, key: 'id' })
	@IsUUID(4)
	@IsString()
	vehicleId: Vehicle['id']
}
