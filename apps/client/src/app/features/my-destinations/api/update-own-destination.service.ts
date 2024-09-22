import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Destination } from '~/shared/types/maps/destination'

@Injectable({
	providedIn: 'root'
})
export class UpdateOwnDestinationService {
	constructor(private readonly http: HttpClient) {}

	execute(
		destinationId: string,
		updateOwnDestinationServiceDto: UpdateOwnVehicleServiceDto
	) {
		return this.http.patch<SuccesfulResponse<unknown>>(
			`/destinations/${destinationId}`,
			updateOwnDestinationServiceDto
		)
	}
}

export type UpdateOwnVehicleServiceDto = Omit<Destination, 'id'>
