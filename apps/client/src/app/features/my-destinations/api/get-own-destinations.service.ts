import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Destination } from '~/shared/types/maps/destination'

@Injectable({
	providedIn: 'root'
})
export class GetOwnDestinationsService {
	constructor(private readonly http: HttpClient) {}

	execute() {
		return this.http.get<SuccesfulResponse<Destination[]>>('/destinations/mine')
	}
}
