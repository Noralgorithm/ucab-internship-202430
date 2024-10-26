import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { GeoJsonLineString } from '~/shared/types/maps/geo-json-line-string.type'
import { Travel } from '~/shared/types/travels/travel.type'

@Injectable({
	providedIn: 'root'
})
export class CreateTravelService {
	constructor(private readonly http: HttpClient) {}

	execute(createTravelServiceDto: CreateTravelServiceDto) {
		return this.http.post<SuccesfulResponse<ResponseDto>>(
			'/travels',
			createTravelServiceDto
		)
	}
}

export interface CreateTravelServiceDto extends Omit<Travel, 'route' | 'id'> {
	route: RouteDto
}

export interface RouteDto {
	duration: string
	description: string
	distance: number
	polyline: GeoJsonLineString
}

interface ResponseDto {
	id: string
}
/* "route": {
	"duration": "08816594262564157495908388746856099112013976635390684333006329555947796747977786627670197s",
	"description": "string",
	"distance": 0,
	"polyline": {
		"coordinates": [
			[
				58.382,
				34.604,
				23
			],
			[
				58.3816,
				34.6037
			],
			[
				58.381,
				34.603,
				12
			]
		],
		"type": "string"
	}
}, */
