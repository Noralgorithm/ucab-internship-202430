import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { BackendResponse } from '../../../shared/types/backend-response.type'
import { parseBackendResponseStatus } from '../../../shared/utils/parse-backend-response-status.util'

@Injectable({
	providedIn: 'root'
})
export class RequestSignUpService {
	constructor(private readonly http: HttpClient) {}

	execute(email: string) {
		return this.http
			.patch<BackendResponse<string, unknown>>('/auth/request-sign-up', {
				email
			})
			.pipe(map(parseBackendResponseStatus))
	}
}
