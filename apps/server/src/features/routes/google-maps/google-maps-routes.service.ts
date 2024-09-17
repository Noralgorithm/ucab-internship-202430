import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NoRoutesFoundError } from '../errors'
import { IntermediateWaypoint, Route, RoutesService, Waypoint } from '../types'
import {
	GOOGLE_MAPS_COMPUTE_ROUTES,
	GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE
} from './constants'
import {
	GoogleMapsComputeRoutesRequest,
	GoogleMapsComputeRoutesResponseBody,
	GoogleMapsRoute
} from './types'

@Injectable()
export class GoogleMapsRoutesService implements RoutesService {
	constructor(private readonly configService: ConfigService) {}

	async createDriveRoute(
		origin: Waypoint,
		destination: Waypoint,
		...waypoints: IntermediateWaypoint[]
	): Promise<Route> {
		const mapsRequest: GoogleMapsComputeRoutesRequest = {
			origin: {
				location: {
					latLng: origin.location.coords,
					heading: origin.location.heading
				},
				sideOfRoad: origin.sideOfRoad
			},
			destination: {
				location: {
					latLng: destination.location.coords,
					heading: destination.location.heading
				},
				sideOfRoad: destination.sideOfRoad
			},
			intermediates: waypoints.map((waypoint) => ({
				location: {
					latLng: waypoint.location.coords,
					heading: waypoint.location.heading
				},
				sideOfRoad: waypoint.sideOfRoad,
				vehicleStopover: waypoint.vehicleStopover,
				via: waypoint.via
			})),
			polylineQuality: 'OVERVIEW',
			polylineEncoding: 'GEO_JSON_LINESTRING',
			routingPreference: 'TRAFFIC_UNAWARE',
			travelMode: 'DRIVE',
			units: 'METRIC',
			languageCode: GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE
		}

		const response = await fetch(GOOGLE_MAPS_COMPUTE_ROUTES.url, {
			headers: {
				'Content-Type': 'application/json',
				'X-Goog-FieldMask':
					'routes.duration,routes.distanceMeters,routes.description,routes.polyline.geoJsonLinestring',
				'X-Goog-Api-Key': this.configService.get(
					'GOOGLE_MAPS_API_KEY'
				) as string
			},
			method: GOOGLE_MAPS_COMPUTE_ROUTES.method,
			body: JSON.stringify(mapsRequest)
		})

		const { routes, fallbackInfo } =
			(await response.json()) as GoogleMapsComputeRoutesResponseBody<GoogleMapsRoute>

		if (routes.length === 0) {
			throw new NoRoutesFoundError(
				'No se encontraron rutas para los puntos especificados'
			)
		}

		// The first route is the recommended route (https://developers.google.com/maps/documentation/routes/reference/rest/v2/TopLevel/computeRoutes#response-body)
		const recommendedRoute = routes[0]

		//TODO: implement fallback logic (https://developers.google.com/maps/documentation/routes/reference/rest/v2/FallbackInfo)
		if (fallbackInfo != null) {
			return {
				distance: recommendedRoute.distanceMeters,
				description: recommendedRoute.description,
				duration: recommendedRoute.duration,
				polyline: recommendedRoute.polyline
			}
		}

		return {
			distance: recommendedRoute.distanceMeters,
			description: recommendedRoute.description,
			duration: recommendedRoute.duration,
			polyline: recommendedRoute.polyline
		}
	}
}
