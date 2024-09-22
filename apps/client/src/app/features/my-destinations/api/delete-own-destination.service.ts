import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'

@Injectable({
	providedIn: 'root'
})
export class DeleteOwnVehicleService {
	constructor(private readonly http: HttpClient) {}

	execute(destinationId: string) {
		return this.http.delete<SuccesfulResponse<unknown>>(
			`/destinations/${destinationId}`
		)
	}
}
