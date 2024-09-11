import { IsUUID } from 'class-validator'

export class DeleteVehicleParamsDto {
	@IsUUID('4')
	id: string
}
