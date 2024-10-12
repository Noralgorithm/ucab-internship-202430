import {
	IsInt,
	IsNumber,
	IsPositive,
	IsString,
	Length,
	MaxLength
} from 'class-validator'
import {
	BRAND_MAX_LENGTH,
	COLOR_MAX_LENGTH,
	MAX_PLATE_LENGTH,
	MIN_PLATE_LENGTH,
	MODEL_MAX_LENGTH
} from '~/shared/constants'
import { NotExists } from '~/shared/validators/not-exists.validator'
import { Vehicle } from '../entities/vehicle.entity'

export class CreateVehicleDto {
	@NotExists({ entity: Vehicle, key: 'plate' })
	@Length(MIN_PLATE_LENGTH, MAX_PLATE_LENGTH)
	@IsString()
	plate: string

	@MaxLength(BRAND_MAX_LENGTH)
	@IsString()
	brand: string

	@MaxLength(COLOR_MAX_LENGTH)
	@IsString()
	color: string

	@MaxLength(MODEL_MAX_LENGTH)
	@IsString()
	model: string

	@IsPositive()
	@IsInt()
	@IsNumber()
	seatQuantity: number
}
