import {
	IsInt,
	IsNumber,
	IsOptional,
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

export class UpdateVehicleDto {
	@Length(MIN_PLATE_LENGTH, MAX_PLATE_LENGTH)
	@IsString()
	@IsOptional()
	plate: string

	@MaxLength(BRAND_MAX_LENGTH)
	@IsString()
	@IsOptional()
	brand: string

	@MaxLength(COLOR_MAX_LENGTH)
	@IsString()
	@IsOptional()
	color: string

	@MaxLength(MODEL_MAX_LENGTH)
	@IsString()
	@IsOptional()
	model: string

	@IsPositive()
	@IsInt()
	@IsNumber()
	@IsOptional()
	seatQuantity: number
}
