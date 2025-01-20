import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Travel } from '~/shared/types/travels/travel.type'

@Injectable({
	providedIn: 'root'
})
export class CancelTravelService {
	constructor(private readonly http: HttpClient) {}

	execute(cancelTravelServiceDto: CancelTravelServiceDto) {
		return this.http.patch<SuccesfulResponse<Travel>>(
			'/travels/cancel',
			cancelTravelServiceDto
		)
	}
}
export interface CancelTravelServiceDto {
	travelId: string
	reason: string
}
