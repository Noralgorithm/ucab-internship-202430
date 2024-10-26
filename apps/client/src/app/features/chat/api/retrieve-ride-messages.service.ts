import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Message, RideMessages } from '~/shared/types/rides/ride-request.type'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class RetrieveRideMessagesService {
	constructor(private readonly http: HttpClient) {}

	execute(rideId: string) {
		const url = `/messages/${rideId}`

		return this.http
			.get<SuccesfulResponse<ResponseDto>>(url)
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
	driver: UserProfile & { profilePicFilename: string }
	passenger: UserProfile & { profilePicFilename: string }
	messages: Message[]
}
