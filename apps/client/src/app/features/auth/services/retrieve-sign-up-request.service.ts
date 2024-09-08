import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SignUpRequest } from '~/shared/types/auth/sign-up-request.type'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class RetrieveSignUpRequestService {
	constructor(private readonly http: HttpClient) {}

	execute(signUpRequestToken: string) {
		const url = `/auth/retrieve-sign-up-request/${signUpRequestToken}`

		return this.http
			.get<SuccesfulResponse<ResponseDto>>(url)
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		response: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<SignUpRequest> {
		return {
			status: 'success',
			data: {
				id: response.data.id,
				email: response.data.email,
				expirationDate: new Date(response.data.expirationDate)
			}
		}
	}
}

interface ResponseDto {
	id: string
	email: string
	expirationDate: string
}
