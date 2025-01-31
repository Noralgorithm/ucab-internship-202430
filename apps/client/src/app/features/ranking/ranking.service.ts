import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { GeoJsonPoint } from '~/shared/types/maps/geo-json-points.type'
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
export class GetRankingAvailableDrivers {
	constructor(private readonly http: HttpClient) {}

	execute(createRankingServiceDTO: CreateRankingServiceDTO) {
		const url = '/ranking/rank'

		return this.http
			.post<SuccesfulResponse<ResponseDto>>(url, createRankingServiceDTO)
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

export interface CreateRankingServiceDTO {
	passengerLocation: GeoJsonPoint
	routeType: 'to-ucab' | 'from-ucab'
	womenOnly: boolean
}
