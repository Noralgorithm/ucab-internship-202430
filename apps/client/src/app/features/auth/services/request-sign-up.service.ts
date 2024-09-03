import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class RequestSignUpService {
	constructor(private readonly http: HttpClient) {}

	execute(email: string) {
		return this.http.patch('/auth/request-sign-up', { email })
	}
}
