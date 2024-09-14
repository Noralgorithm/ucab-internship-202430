import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class CreateOwnVehicleService {
	constructor(private readonly http: HttpClient) {}

	execute(createOwnVehicleServiceDto: CreateOwnVehicleServiceDto) {
		return this.http.post<SuccesfulResponse<unknown>>(
			'/vehicles',
			createOwnVehicleServiceDto
		)
	}
}

export interface CreateOwnVehicleServiceDto {
	plate: string
	brand: string
	color: string
	model: string
	seatQuantity: number
}
