import { HttpClient, HttpContext } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'

import { map } from 'rxjs'
import { BYPASS_LOADING } from '~/core/interceptors/loading.interceptor'
import { Travel } from '~/shared/types/travels/travel.type'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class GetRideService {
	constructor(private readonly http: HttpClient) {}

	execute(rideId: string, withLoading = true) {
		const url = `/rides/${rideId}`

		return this.http
			.get<SuccesfulResponse<ResponseDto>>(url, {
				context: new HttpContext().set(BYPASS_LOADING, !withLoading)
			})
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		response: SuccesfulResponse<ResponseDto>
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
							profilePicSrc: constructBackendImageUrl(
								response.data.travel.vehicle.driver.profilePicFilename
							)
						}
					}
				}
			}
		}
	}
}
type ResponseDto = Omit<RideTravelData, 'travel'> & {
	travel: Travel & {
		vehicle: Vehicle & {
			driver: UserProfile & { profilePicFilename: string }
		}
	}
}
