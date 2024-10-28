import { HttpClient, HttpContext } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { BYPASS_LOADING } from '~/core/interceptors/loading.interceptor'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Message, RideMessages } from '~/shared/types/rides/ride-request.type'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class RetrieveRideMessagesService {
	constructor(private readonly http: HttpClient) {}

	execute(rideId: string, loading = true) {
		const url = `/messages/${rideId}`

		return this.http
			.get<SuccesfulResponse<ResponseDto>>(url, {
				context: new HttpContext().set(BYPASS_LOADING, loading)
			})
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		res: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<RideMessages> {
		return {
			status: res.status,
			data: {
				...res.data,
				driver: {
					...res.data.driver,
					profilePicSrc: constructBackendImageUrl(
						res.data.driver.profilePicFilename
					)
				},
				passenger: {
					...res.data.passenger,
					profilePicSrc: constructBackendImageUrl(
						res.data.passenger.profilePicFilename
					)
				}
			}
		}
	}
}

interface ResponseDto {
	driver: UserProfile & { id: string; profilePicFilename: string }
	passenger: UserProfile & { id: string; profilePicFilename: string }
	messages: Message[]
}
