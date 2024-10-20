import { Buffer } from 'node:buffer'
import { fromGeoJSON } from '@mapbox/polyline'
import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { validateOrReject } from 'class-validator'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { User } from '~/features/users/entities/user.entity'
import { RouteType } from '~/shared/constants'
import {
	GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE,
	GOOGLE_MAPS_STATIC_MAPS
} from '~/shared/constants'
import { FileStorageService } from '~/shared/files-upload/file-storage/file-storage.service'
import { RouteDto } from '../dto/route.dto'
import { RouteEntity } from '../entities/route.entity'
import { NoRoutesFoundError } from '../errors'
import {
	GeoJsonLineString,
	IntermediateWaypoint,
	Route,
	RoutesService,
	Waypoint
} from '../types'
import { GOOGLE_MAPS_COMPUTE_ROUTES } from './constants'
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
		private readonly configService: ConfigService,
		private readonly fileStorageService: FileStorageService
	) {}

	async findAll(
		options?: FindManyOptions<RouteEntity>
	): Promise<RouteEntity[]> {
		const routes = await this.routesRepository.find(options)

		return routes
	}

	async findOne(options: FindOneOptions<RouteEntity>): Promise<RouteEntity> {
		const route = await this.routesRepository.findOne(options)

		if (route == null) {
			throw new NotFoundException('No se encontró la ruta especificada')
		}

		return route
	}

	async takeRoutePhoto({
		route
	}: { route: RouteDto }): Promise<{ photoFilename: string }> {
		validateOrReject(route)

		const { polyline } = route
		const { coordinates } = polyline

		const [originGeoJsonPosition, destinationGeoJsonPosition] = [
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that coordinates is not empty and has at least two elements
			coordinates.at(0)!,
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that coordinates is not empty and has at least two elements
			coordinates.at(-1)!
		]

		const origin = {
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that geoJsonPosition is not empty and has at least two elements
			lat: originGeoJsonPosition.at(1)!,
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that geoJsonPosition is not empty and has at least two elements
			lng: originGeoJsonPosition.at(0)!
		}

		const destination = {
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that geoJsonPosition is not empty and has at least two elements
			lat: destinationGeoJsonPosition.at(1)!,
			// biome-ignore lint/style/noNonNullAssertion: Validated in geo-json-line-string.dto.ts that geoJsonPosition is not empty and has at least two elements
			lng: destinationGeoJsonPosition.at(0)!
		}

		const params = {
			markers: {
				origin: `size:mid|label:O|${origin.lat},${origin.lng}`,
				destination: `size:mid|label:D|${destination.lat},${destination.lng}`
			},
			size: '300x300',
			key: this.configService.get('GOOGLE_MAPS_API_KEY'),
			path: `weight:5|enc:${fromGeoJSON(polyline)}`,
			format: 'png',
			maptype: 'roadmap',
			language: GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE,
			scale: '2'
		}

		const googleMapsUrl = new URL(GOOGLE_MAPS_STATIC_MAPS.url)

		googleMapsUrl.searchParams.append('size', params.size)
		googleMapsUrl.searchParams.append('markers', params.markers.origin)
		googleMapsUrl.searchParams.append('markers', params.markers.destination)
		googleMapsUrl.searchParams.append('path', params.path)
		googleMapsUrl.searchParams.append('format', params.format)
		googleMapsUrl.searchParams.append('maptype', params.maptype)
		googleMapsUrl.searchParams.append('language', params.language)
		googleMapsUrl.searchParams.append('scale', params.scale)
		googleMapsUrl.searchParams.append('key', params.key)

		const response = await fetch(googleMapsUrl, {
			method: GOOGLE_MAPS_STATIC_MAPS.method
		})

		if (!response.ok) {
			throw new GoogleMapsAPIError('Error al obtener la imagen del mapa')
		}

		const imageAsBlob = await response.blob()

		const buffer = Buffer.from(await imageAsBlob.arrayBuffer())

		const photoFilename = this.fileStorageService.save({
			buffer,
			mimetype: 'image/png',
			size: buffer.length
		})

		return { photoFilename }
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
		const { photoFilename } = await this.takeRoutePhoto({ route })

		return await this.routesRepository.save({
			name,
			type,
			distance: route.distance,
			duration: route.duration,
			description: route.description,
			geoJsonLineString: route.polyline,
			photoFilename,
			user
		})
	}
}
