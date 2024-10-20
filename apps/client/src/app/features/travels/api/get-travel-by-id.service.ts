import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { RideRequest } from '~/shared/types/rides/ride-request.type'
import { TravelLobbyData } from '~/shared/types/travels/travel.type'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class GetTravelByIdService {
	constructor(private readonly http: HttpClient) {}

	execute(travelId: string) {
		const url = `/travels/${travelId}`

		return this.http
			.get<SuccesfulResponse<ResponseDto>>(url)
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
	rides: (RideRequest & {
		passenger: { profilePicFilename: string }
	})[]
}
