import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Travel } from '~/shared/types/travels/travel.type'

@Injectable({
	providedIn: 'root'
})
export class CreateTravelService {
	constructor(private readonly http: HttpClient) {}

	execute(createTravelServiceDto: CreateTravelServiceDto) {
		return this.http.post<SuccesfulResponse<unknown>>(
			'/destinations',
			createTravelServiceDto
		)
	}
}

export interface CreateTravelServiceDto extends Travel {}

/* {
  "forWomen": false,
  "type": "to-ucab",
  "status": "not-started",
  "availableSeatQuantity": 1,
  "vehicleId": "string",
  "routeId": "string"
} */
