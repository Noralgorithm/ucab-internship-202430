import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})

//TODO: change the name of the service to a better one that refers to the status being for rides and travel only.
export class UserStatusService {
	constructor(private readonly http: HttpClient) {}

	execute() {
		return this.http.get<SuccesfulResponse<UserStateServiceDto>>('/user-status')
	}
}

export interface UserStateServiceDto {
	isIn: boolean
	payload: Payload | null
}

interface Payload {
	type: 'ride' | 'travel'
	id: string
}
