import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class AnswerRideRequestService {
	constructor(private readonly http: HttpClient) {}

	execute(
		rideId: string,
		answerRideRequestServiceDto: AnswerRideRequestServiceDto
	) {
		return this.http.patch<SuccesfulResponse<unknown>>(
			`/rides/${rideId}/answer-ride-request`,
			answerRideRequestServiceDto
		)
	}
}

export interface AnswerRideRequestServiceDto {
	isAccepted: boolean
	travelCancelType?: 'driver-denial' | 'passenger-denial'
}
