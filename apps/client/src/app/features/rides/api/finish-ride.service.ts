import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { GeoJsonPoint } from '~/shared/types/maps/geo-json-points.type'

@Injectable({
	providedIn: 'root'
})
export class FinishRideService {
	constructor(private readonly http: HttpClient) {}

	execute(finishRideDto: FinishRideServiceDto) {
		return this.http.patch<SuccesfulResponse<FinishRideServiceDto>>(
			`/rides/${finishRideDto.rideId}/finish-ride`,
			finishRideDto
		)
	}
}

export interface FinishRideServiceDto {
	rideId: string
	dropOff: GeoJsonPoint
	passengerStarRating: number
	passengerCommentAfterRide: 'no comments'
}
