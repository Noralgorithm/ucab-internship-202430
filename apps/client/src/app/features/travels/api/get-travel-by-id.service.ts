import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Travel } from '~/shared/types/travels/travel.type'

@Injectable({
	providedIn: 'root'
})
export class GetTravelByIdService {
	constructor(private readonly http: HttpClient) {}

	execute(travelId: string) {
		const url = `/travels/${travelId}`

		return this.http.get<SuccesfulResponse<Travel>>(url)
	}
}
