import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { BackendResponse } from '../../../shared/types/backend-response.type'
import { parseBackendResponseStatus } from '../../../shared/utils/parse-backend-response-status.util'

@Injectable({
	providedIn: 'root'
})
export class SignInService {
	constructor(private readonly http: HttpClient) {}

	execute(email: string, password: string) {
		return this.http
			.post<BackendResponse<unknown, unknown>>('/auth/sign-in', {
				email,
				password
			})
			.pipe(map(parseBackendResponseStatus))
	}
}
