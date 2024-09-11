import { IsUUID } from 'class-validator'

export class UpdateVehicleParamsDto {
	@IsUUID('4')
	id: string
}
