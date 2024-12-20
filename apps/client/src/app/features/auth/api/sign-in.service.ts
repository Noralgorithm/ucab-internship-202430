import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs'
import {
	GENDER_KEY,
	ID_KEY,
	PREFERRED_ROLE_KEY,
	TOKEN_KEY
} from '~/shared/constants'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class SignInService {
	constructor(private readonly http: HttpClient) {}

	execute(email: string, password: string) {
		return this.http
			.post<SuccesfulResponse<ResponseDto>>('/auth/sign-in', {
				email,
				password
			})
			.pipe(tap(this.storeSessionData))
	}

	private storeSessionData(response: SuccesfulResponse<ResponseDto>) {
		localStorage.setItem(TOKEN_KEY, response.data.accessToken)
		localStorage.setItem(ID_KEY, response.data.user.id)
		localStorage.setItem(PREFERRED_ROLE_KEY, response.data.user.preferredRole)
		localStorage.setItem(GENDER_KEY, response.data.user.gender)
	}
}

interface ResponseDto {
	accessToken: string
	user: {
		id: string
		preferredRole: string
		gender: string
	}
}
