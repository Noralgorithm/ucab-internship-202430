import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GOOGLE_MAPS_API_KEY } from '~root/secrets'

const ENDPOINT_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes'

@Injectable({
	providedIn: 'root'
})
export class ComputeRoutesService {
	constructor(private readonly http: HttpClient) {}

	execute(
		origin: google.maps.LatLngLiteral,
		destination: google.maps.LatLngLiteral
	) {
		return this.http.post(
			ENDPOINT_URL,
			{
				origin: {
					location: {
						latLng: origin
					}
				},
				destination: {
					location: {
						latLng: destination
					}
				},
				travelMode: 'DRIVE',
				routingPreference: 'TRAFFIC_UNAWARE',
				computeAlternativeRoutes: true,
				routeModifiers: {
					avoidTolls: false,
					avoidHighways: false,
					avoidFerries: false
				},
				languageCode: 'es-US',
				units: 'IMPERIAL'
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
					'X-Goog-FieldMask':
						'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
				}
			}
		)
	}
}
