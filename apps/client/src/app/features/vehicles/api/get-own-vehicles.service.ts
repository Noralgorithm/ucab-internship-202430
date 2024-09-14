import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'

@Injectable({
	providedIn: 'root'
})
export class GetOwnVehiclesService {
	constructor(private readonly http: HttpClient) {}

	execute() {
		return this.http
			.get<SuccesfulResponse<ResponseDto>>('/vehicles/mine')
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		response: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<Vehicle[]> {
		return {
			status: response.status,
			data: response.data.map((vehicle) => ({
				id: vehicle.id,
				plate: vehicle.plate,
				brand: vehicle.brand,
				color: vehicle.color,
				model: vehicle.model,
				seatQuantity: vehicle.seatQuantity,
				createdAt: new Date(vehicle.createdAt),
				updatedAt: new Date(vehicle.updatedAt)
			}))
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
}[]
