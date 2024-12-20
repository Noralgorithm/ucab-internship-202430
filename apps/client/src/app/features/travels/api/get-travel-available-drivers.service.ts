import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import {
	TravelAvailableDriverData,
	TravelType
} from '~/shared/types/travels/travel.type'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

interface QueryParams {
	isWomanOnly?: boolean
	type?: TravelType
	lat?: string
	lng?: string
}

@Injectable({
	providedIn: 'root'
})
export class GetTravelAvailableDrivers {
	constructor(private readonly http: HttpClient) {}

	execute(query?: QueryParams) {
		const url = '/travels/available-drivers'

		return this.http
			.get<SuccesfulResponse<ResponseDto>>(url, {
				params: {
					...query
				}
			})
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		res: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<TravelAvailableDriverData[]> {
		return {
			status: res.status,
			data: res.data.map((travel) => ({
				...travel,
				vehicle: {
					...travel.vehicle,
					driver: {
						...travel.vehicle.driver,
						profilePicSrc: constructBackendImageUrl(
							travel.vehicle.driver.profilePicFilename
						)
					}
				}
			}))
		}
	}
}

type ResponseDto = (Omit<TravelAvailableDriverData, 'vehicle'> & {
	vehicle: Vehicle & {
		driver: UserProfile & { profilePicFilename: string }
	}
})[]
