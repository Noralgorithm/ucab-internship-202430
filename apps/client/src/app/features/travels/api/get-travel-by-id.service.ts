import { HttpClient, HttpContext } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { BYPASS_LOADING } from '~/core/interceptors/loading.interceptor'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Ride } from '~/shared/types/rides/ride-request.type'
import { TravelLobbyData } from '~/shared/types/travels/travel.type'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class GetTravelByIdService {
	constructor(private readonly http: HttpClient) {}

	execute(travelId: string, loading = true) {
		const url = `/travels/${travelId}`

		return this.http
			.get<SuccesfulResponse<ResponseDto>>(url, {
				context: new HttpContext().set(BYPASS_LOADING, !loading)
			})
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		res: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<TravelLobbyData> {
		return {
			status: res.status,
			data: {
				...res.data,
				rides: res.data.rides.map((rideRequest) => ({
					...rideRequest,
					passenger: {
						...rideRequest.passenger,
						profilePicSrc: constructBackendImageUrl(
							rideRequest.passenger.profilePicFilename
						)
					}
				}))
			}
		}
	}
}

type ResponseDto = Omit<TravelLobbyData, 'rides'> & {
	rides: (Ride & {
		passenger: { profilePicFilename: string }
	})[]
}
