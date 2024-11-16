import { HttpClient, HttpContext } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BYPASS_LOADING } from '~/core/interceptors/loading.interceptor'

@Injectable({
	providedIn: 'root'
})
export class SendRideMessageService {
	constructor(private readonly http: HttpClient) {}

	execute(rideId: string, content: string, loading = true) {
		const url = `/messages/${rideId}`

		return this.http.post(
			url,
			{ content },
			{
				context: new HttpContext().set(BYPASS_LOADING, loading)
			}
		)
	}
}
