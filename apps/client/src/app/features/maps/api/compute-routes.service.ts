import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { GeoJsonLineString } from '~/shared/types/maps/geo-json-line-string.type'

@Injectable({
	providedIn: 'root'
})
export class ComputeRoutesService {
	constructor(private readonly http: HttpClient) {}

	fromUcab(location: google.maps.LatLngLiteral) {
		return this.http.post<SuccesfulResponse<ResponseDto>>(
			'/routes/drive-from-ucab',
			{
				destination: {
					location: {
						coords: {
							latitude: location.lat,
							longitude: location.lng
						}
					}
				},
				alternativeRoutes: true
			}
		)
	}

	toUcab(location: google.maps.LatLngLiteral) {
		return this.http.post<SuccesfulResponse<ResponseDto>>(
			'/routes/drive-to-ucab',
			{
				origin: {
					location: {
						coords: {
							latitude: location.lat,
							longitude: location.lng
						}
					}
				},
				alternativeRoutes: true
			}
		)
	}
}

type ResponseDto = {
	distance: number
	duration: string
	polyline: {
		geoJsonLinestring: GeoJsonLineString
	}
}[]
