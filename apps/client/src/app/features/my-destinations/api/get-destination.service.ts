import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Destination } from '~/shared/types/maps/destination'

@Injectable({
	providedIn: 'root'
})
export class GetDestinationService {
	constructor(private readonly http: HttpClient) {}

	execute(destinationId: string) {
		const url = `/destinations/${destinationId}`

		return this.http.get<SuccesfulResponse<Destination>>(url)
	}
}
