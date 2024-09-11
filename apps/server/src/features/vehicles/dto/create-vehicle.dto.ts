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
	MODEL_MAX_LENGTH,
	PLATE_LENGTH
} from '~/shared/constants'

export class CreateVehicleDto {
	@Length(PLATE_LENGTH, PLATE_LENGTH)
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