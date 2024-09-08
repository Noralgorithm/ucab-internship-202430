import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class RequestSignUpService {
	constructor(private readonly http: HttpClient) {}

	execute(email: string) {
		return this.http.patch<SuccesfulResponse<unknown>>(
			'/auth/request-sign-up',
			{
				email
			}
		)
	}
}
