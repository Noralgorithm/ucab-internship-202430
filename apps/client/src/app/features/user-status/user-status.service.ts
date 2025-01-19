import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { TravelStatus } from '~/shared/types/travels/travel.type'

@Injectable({
	providedIn: 'root'
})
export class UserStatusService {
	constructor(private readonly http: HttpClient) {}

	userStatus(): Observable<SuccesfulResponse<UserStatusServiceDto>> {
		return this.http.get<SuccesfulResponse<UserStatusServiceDto>>(
			'/users/status'
		)
	}
}

export interface UserStatusServiceDto {
	isIn: boolean
	payload: Payload | null
}

interface Payload {
	type: 'ride' | 'travel'
	id: string
	status: TravelStatus
}
