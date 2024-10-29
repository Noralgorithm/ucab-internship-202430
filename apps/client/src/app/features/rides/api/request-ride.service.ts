import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { GeoJsonPoint } from '~/shared/types/maps/geo-json-points.type'
import { Ride } from '~/shared/types/rides/ride-request.type'

@Injectable({
	providedIn: 'root'
})
export class RequestRideService {
	constructor(private readonly http: HttpClient) {}

	execute(requestRideServiceDto: RequestRideServiceDto) {
		return this.http.post<SuccesfulResponse<Ride>>(
			'/rides/for-me',
			requestRideServiceDto
		)
	}
}

export interface RequestRideServiceDto {
	travelId: string
	point: GeoJsonPoint
}
