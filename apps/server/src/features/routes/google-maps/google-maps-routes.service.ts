import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '~/features/users/entities/user.entity'
import { RouteType } from '~/shared/constants'
import { RouteEntity } from '../entities/route.entity'
import { NoRoutesFoundError } from '../errors'
import {
	GeoJsonLineString,
	IntermediateWaypoint,
	Route,
	RoutesService,
	Waypoint
} from '../types'
import {
	GOOGLE_MAPS_COMPUTE_ROUTES,
	GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE
} from './constants'
import { GoogleMapsAPIError } from './errors'
import {
	GoogleMapsComputeRoutesRequest,
	GoogleMapsComputeRoutesResponseBody
} from './types'

@Injectable()
export class GoogleMapsRoutesService implements RoutesService {
	constructor(
		@InjectRepository(RouteEntity)
		private readonly routesRepository: Repository<RouteEntity>,
		private readonly configService: ConfigService
	) {}

	async find({ id }: { id: string }): Promise<RouteEntity> {
		const route = await this.routesRepository.findOne({ where: { id } })

		if (route == null) {
			throw new NotFoundException('No se encontró la ruta especificada')
		}

		return route
	}

	async createAndSaveUserDriveRoute({
		origin,
		destination,
		type,
		name,
		user,
		waypoints,
		alternativeRoutes
	}: {
		origin: Waypoint
		destination: Waypoint
		type: RouteType
		name: string
		user: User
		waypoints?: IntermediateWaypoint[]
		alternativeRoutes?: boolean
	}) {
		const routes = await this.createDriveRoute({
			origin,
			destination,
			waypoints,
			alternativeRoutes
		})

		// The first route is the recommended route (https://developers.google.com/maps/documentation/routes/reference/rest/v2/TopLevel/computeRoutes#response-body)
		const recommendedRoute = routes[0]

		return await this.saveUserRoute({
			route: recommendedRoute,
			type,
			name,
			user
		})
	}

	async createDriveRoute({
		origin,
		destination,
		waypoints,
		alternativeRoutes
	}: {
		origin: Waypoint
		destination: Waypoint
		waypoints?: IntermediateWaypoint[]
		alternativeRoutes?: boolean
	}): Promise<Array<Route>> {
		const mapsRequest: GoogleMapsComputeRoutesRequest = {
			origin: {
				location: {
					latLng: origin.location.coords,
					heading: origin.location.heading
				}
			},
			destination: {
				location: {
					latLng: destination.location.coords,
					heading: destination.location.heading
				}
			},
			intermediates:
				waypoints != null
					? waypoints.map((waypoint) => ({
							location: {
								latLng: waypoint.location.coords,
								heading: waypoint.location.heading
							},
							sideOfRoad: waypoint.sideOfRoad,
							vehicleStopover: waypoint.vehicleStopover,
							via: waypoint.via
						}))
					: undefined,
			polylineQuality: 'OVERVIEW',
			polylineEncoding: 'GEO_JSON_LINESTRING',
			routingPreference: 'TRAFFIC_UNAWARE',
			travelMode: 'DRIVE',
			units: 'METRIC',
			languageCode: GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE,
			computeAlternativeRoutes: alternativeRoutes
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

		const responseJson =
			(await response.json()) as GoogleMapsComputeRoutesResponseBody<GeoJsonLineString>

		const jsonResponseIsEmpty = JSON.stringify(responseJson) === '{}'

		if (jsonResponseIsEmpty) {
			throw new NoRoutesFoundError(
				'No se encontraron rutas para los puntos especificados'
			)
		}

		const { error, routes, fallbackInfo } = responseJson

		if (error != null) {
			throw new GoogleMapsAPIError(
				`${error.status}(${error.code}): ${error.message}`,
				{ cause: error }
			)
		}

		if (routes.length === 0) {
			throw new NoRoutesFoundError(
				'No se encontraron rutas para los puntos especificados'
			)
		}

		//TODO: make type assertions for recommendedRoute.polyline instead of using 'as'
		//TODO: implement fallback logic (https://developers.google.com/maps/documentation/routes/reference/rest/v2/FallbackInfo)
		if (fallbackInfo != null) {
			return routes.map((route) => ({
				distance: route.distanceMeters,
				description: route.description,
				duration: route.duration,
				polyline: route.polyline
			}))
		}

		return routes.map((route) => ({
			distance: route.distanceMeters,
			description: route.description,
			duration: route.duration,
			polyline: route.polyline
		}))
	}

	async saveUserRoute({
		route,
		type,
		name,
		user
	}: {
		route: Route
		type: RouteType
		name: string
		user: User
	}): Promise<RouteEntity> {
		return await this.routesRepository.save({
			name: name,
			type: type,
			distance: route.distance,
			duration: route.duration,
			description: route.description,
			geoJsonLineString: route.polyline,
			user
		})
	}
}
