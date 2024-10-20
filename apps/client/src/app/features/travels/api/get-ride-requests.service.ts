import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { RideRequest } from '~/shared/types/rides/ride-request.type'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class GetRideRequestsService {
	constructor(private readonly http: HttpClient) {}

	execute(travelId: string) {
		const url = `/travels/${travelId}/ride-requests`

		return this.http
			.get<SuccesfulResponse<ResponseDto>>(url)
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		res: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<RideRequest[]> {
		return {
			status: res.status,
			data: res.data.map((rideRequest) => ({
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

type ResponseDto = (RideRequest & {
	passenger: { profilePicFilename: string }
})[]
