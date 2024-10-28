import { HttpClient, HttpContext } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'

import { map } from 'rxjs'
import { BYPASS_LOADING } from '~/core/interceptors/loading.interceptor'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class GetRideService {
	constructor(private readonly http: HttpClient) {}

	execute(rideId: string, withLoading = true) {
		const url = `/rides/${rideId}`

		return this.http
			.get<SuccesfulResponse<RideTravelData>>(url, {
				context: new HttpContext().set(BYPASS_LOADING, !withLoading)
			})
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		response: SuccesfulResponse<RideTravelData>
	): SuccesfulResponse<RideTravelData> {
		return {
			status: response.status,
			data: {
				...response.data,
				travel: {
					...response.data.travel,
					vehicle: {
						...response.data.travel.vehicle,
						driver: {
							...response.data.travel.vehicle.driver,
							//TODO: Fix this
							profilePicSrc: constructBackendImageUrl(
								response.data.travel.vehicle.driver.profilePicSrc
							)
						}
					}
				}
			}
		}
	}
}
