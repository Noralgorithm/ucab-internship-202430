import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Destination } from '~/shared/types/maps/destination'

@Injectable({
	providedIn: 'root'
})
export class CreateOwnDestinationService {
	constructor(private readonly http: HttpClient) {}

	execute(createOwnDestinationServiceDto: CreateOwnDestinationServiceDto) {
		return this.http.post<SuccesfulResponse<unknown>>(
			'/destinations',
			createOwnDestinationServiceDto
		)
	}
}

export type CreateOwnDestinationServiceDto = Omit<Destination, 'id'>
