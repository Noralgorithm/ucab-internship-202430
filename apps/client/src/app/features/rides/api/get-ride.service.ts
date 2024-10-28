import { HttpClient, HttpContext } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'

import { BYPASS_LOADING } from '~/core/interceptors/loading.interceptor'

@Injectable({
	providedIn: 'root'
})
export class GetRideService {
	constructor(private readonly http: HttpClient) {}

	execute(rideId: string, withLoading = true) {
		const url = `/rides/${rideId}`

		return this.http.get<SuccesfulResponse<RideTravelData>>(url, {
			context: new HttpContext().set(BYPASS_LOADING, !withLoading)
		})
	}
}
