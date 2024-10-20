import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Destination } from '~/shared/types/maps/destination'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class GetOwnDestinationsService {
	constructor(private readonly http: HttpClient) {}

	execute() {
		return this.http
			.get<SuccesfulResponse<ResponseDto>>('/destinations/mine')
			.pipe(map(this.parseResponse))
	}

	private parseResponse(
		res: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<Destination[]> {
		return {
			status: res.status,
			data: res.data.map((d) => ({
				...d,
				photoSrc: constructBackendImageUrl(d.destinationPhotoFilename)
			}))
		}
	}
}

type ResponseDto = (Destination & { destinationPhotoFilename: string })[]
