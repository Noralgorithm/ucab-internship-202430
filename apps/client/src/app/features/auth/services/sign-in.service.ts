import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '../../../shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class SignInService {
	constructor(private readonly http: HttpClient) {}

	execute(email: string, password: string) {
		return this.http.post<SuccesfulResponse<unknown>>('/auth/sign-in', {
			email,
			password
		})
	}
}
