import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Travel } from '~/shared/types/travels/travel.type'

@Injectable({
	providedIn: 'root'
})
export class CompleteTravelService {
	constructor(private readonly http: HttpClient) {}

	execute(completeTravelServiceDto: CompleteTravelServiceDto) {
		return this.http.patch<SuccesfulResponse<Travel>>(
			'/travels/complete',
			completeTravelServiceDto
		)
	}
}
export interface CompleteTravelServiceDto {
	travelId: string
	rides: RideRating[]
}

export type RideRating = {
	rideId: string
	driverStarRating: number
	driverCommentAfterRide: string
}
