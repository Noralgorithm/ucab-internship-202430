import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs'
import { TOKEN_KEY } from '~/shared/constants'
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
			.pipe(tap(this.storeToken))
	}

	private storeToken(response: SuccesfulResponse<ResponseDto>) {
		localStorage.setItem(TOKEN_KEY, response.data.accessToken)
	}
}

interface ResponseDto {
	accessToken: string
}
