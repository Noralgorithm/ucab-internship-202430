import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'

@Injectable({
	providedIn: 'root'
})
export class GetVehicleByIdService {
	constructor(private readonly http: HttpClient) {}

	execute(vehicleId: string) {
		return this.http
			.get<SuccesfulResponse<ResponseDto>>(`/vehicles/${vehicleId}`)
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		response: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<Vehicle> {
		return {
			status: response.status,
			data: {
				id: response.data.id,
				plate: response.data.plate,
				brand: response.data.brand,
				color: response.data.color,
				model: response.data.model,
				seatQuantity: response.data.seatQuantity,
				createdAt: new Date(response.data.createdAt),
				updatedAt: new Date(response.data.updatedAt)
			}
		}
	}
}

type ResponseDto = {
	internalId: number
	id: string
	plate: string
	brand: string
	color: string
	model: string
	seatQuantity: number
	createdAt: string
	updatedAt: string
	deletedAt: string | null
}
