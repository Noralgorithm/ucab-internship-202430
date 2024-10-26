import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class SendRideMessageService {
	constructor(private readonly http: HttpClient) {}

	execute(rideId: string, content: string) {
		const url = `/messages/${rideId}`

		return this.http.post(url, { content })
	}
}
