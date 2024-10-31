import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Ride } from '~/shared/types/rides/ride-request.type'

@Injectable({
	providedIn: 'root'
})
export class StartTravelService {
	constructor(private readonly http: HttpClient) {}

	execute(startTravelServiceDto: StartTravelServiceDto) {
		return this.http.patch<SuccesfulResponse<Ride>>(
			'/travels/start',
			startTravelServiceDto
		)
	}
}

export interface StartTravelServiceDto {
	travelId: string
}
