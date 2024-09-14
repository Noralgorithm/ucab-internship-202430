import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class UpdateOwnVehicleService {
	constructor(private readonly http: HttpClient) {}

	execute(
		vehicleId: string,
		updateOwnVehicleServiceDto: UpdateOwnVehicleServiceDto
	) {
		return this.http.patch<SuccesfulResponse<unknown>>(
			`/vehicles/${vehicleId}`,
			updateOwnVehicleServiceDto
		)
	}
}

export interface UpdateOwnVehicleServiceDto {
	plate?: string
	brand?: string
	color?: string
	model?: string
	seatQuantity?: number
}
