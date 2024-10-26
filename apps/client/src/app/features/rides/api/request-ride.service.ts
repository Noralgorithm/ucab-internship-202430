import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { GeoJsonPoint } from '~/shared/types/maps/geo-json-points.type'

@Injectable({
	providedIn: 'root'
})
export class RequestRideService {
	constructor(private readonly http: HttpClient) {}

	execute(
		requestRideServiceDto: RequestRideServiceDto,
		travelType: 'from-ucab' | 'to-ucab'
	) {
		return this.http.post<SuccesfulResponse<unknown>>(
			`/travels/${travelType}/for-me`,
			requestRideServiceDto
		)
	}
}

export interface RequestRideServiceDto {
	travelId: string
	point: GeoJsonPoint
}
