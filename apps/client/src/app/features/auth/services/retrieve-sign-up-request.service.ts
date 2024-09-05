import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { Err, Ok, Result } from 'ts-results'
import { SignUpRequest } from '../../../shared/types/auth/sign-up-request.type'
import { BackendResponse } from '../../../shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class RetrieveSignUpRequestService {
	constructor(private readonly http: HttpClient) {}

	execute(signUpRequestToken: string) {
		const url = `/auth/retrieve-sign-up-request/${signUpRequestToken}`

		return this.http
			.get<BackendResponse<ResponseDto, unknown>>(url)
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		response: BackendResponse<ResponseDto, unknown>
	): Result<SignUpRequest, unknown> {
		if (response.status === 'success') {
			return new Ok({
				id: response.data.id,
				email: response.data.email,
				expirationDate: new Date(response.data.expirationDate),
				a: 'asd'
			})
		}

		return new Err(response.data)
	}
}

interface ResponseDto {
	id: string
	email: string
	expirationDate: string
}
