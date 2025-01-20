import { fromGeoJSON } from '@mapbox/polyline'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GeoJsonLineString } from '~/features/routes/types'
import { GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE } from '~/shared/constants'
import { GeoJsonPoint } from '~/shared/types'
import {
	Destination,
	DistanceMatrix,
	DistanceMatrixStrategy,
	Origin
} from './types'

@Injectable()
export class GoogleMapsDistanceMatrixStrategy
	implements DistanceMatrixStrategy
{
	constructor(private readonly configService: ConfigService) {}

	async get({
		origins,
		destinations
	}: {
		origins: Origin[]
		destinations: Destination[]
	}): Promise<DistanceMatrix[]> {
		const mapGeoJsonParams = (
			geoJsonParam: GeoJsonPoint | GeoJsonLineString
		) => {
			if (isGeoJsonPoint(geoJsonParam)) {
				return `${geoJsonParam.coordinates[1]},${geoJsonParam.coordinates[0]}`
			}

			if (isGeoJsonLineString(geoJsonParam)) {
				return `enc:${fromGeoJSON(geoJsonParam)}:`
			}

			throw new Error('Invalid origin')
		}

		const params = new Map([
			['origins', origins.map(mapGeoJsonParams).join('|')],
			['destinations', destinations.map(mapGeoJsonParams).join('|')],
			['key', this.configService.get('GOOGLE_MAPS_API_KEY') as string],
			['language', GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE],
			['mode', 'walking'],
			['units', 'metric']
		] as const)

		const distanceMatrixGoogleMapsUrl = new URL(
			'https://maps.googleapis.com/maps/api/distancematrix/json'
		)

		for (const [key, value] of params) {
			distanceMatrixGoogleMapsUrl.searchParams.append(key, value)
		}

		const response = await fetch(distanceMatrixGoogleMapsUrl, {
			method: 'GET'
		})

		if (!response.ok) {
			throw new Error('Error al obtener la matriz de distancias')
		}

		const responseJson =
			(await response.json()) as GoogleMapsDistanceMatrixJsonResponse

		if (responseJson.status !== 'OK') {
			// console.error(`${responseJson.status}: ${responseJson.error_message}`);
		}

		const originsAsGeoJsonPoints = origins.reduce((acc, cur) => {
			if (isGeoJsonPoint(cur)) {
				return acc.concat(cur)
			}

			if (isGeoJsonLineString(cur)) {
				return acc.concat(
					cur.coordinates.map((coord) => ({
						type: 'Point',
						coordinates: coord
					})) as GeoJsonPoint[]
				)
			}

			throw new Error('Invalid origin')
		}, [] as GeoJsonPoint[])

		const destinationsAsGeoJsonPoints = destinations.reduce((acc, cur) => {
			if (isGeoJsonPoint(cur)) {
				return acc.concat(cur)
			}

			if (isGeoJsonLineString(cur)) {
				return acc.concat(
					cur.coordinates.map((coord) => ({
						type: 'Point',
						coordinates: coord
					})) as GeoJsonPoint[]
				)
			}

			throw new Error('Invalid origin')
		}, [] as GeoJsonPoint[])

		return responseJson.status === 'OK'
			? responseJson.origin_addresses.flatMap((_, oriIndex) => {
					return responseJson.rows[oriIndex].elements
						.map((el, elIndex) =>
							el.status === 'OK'
								? {
										origin: originsAsGeoJsonPoints[oriIndex],
										destination: destinationsAsGeoJsonPoints[elIndex],
										distance: el.distance.value,
										duration: `${el.duration.value}s`
									}
								: null
						)
						.filter((el) => el != null)
				})
			: []
	}
}

function isGeoJsonPoint(value: unknown): value is GeoJsonPoint {
	return (value as GeoJsonPoint).type === 'Point'
}

function isGeoJsonLineString(value: unknown): value is GeoJsonLineString {
	return (value as GeoJsonLineString).type === 'LineString'
}

interface GoogleMapsDistanceMatrixJsonResponse {
	destination_addresses: string[]
	origin_addresses: string[]
	rows: Array<{
		elements: Array<{
			distance: {
				text: string
				value: number
			}
			duration: {
				text: string
				value: number
			}
			status: DistanceMatrixElementStatus
		}>
	}>
	status: DistanceMatrixStatus
	error_message?: string
}

type DistanceMatrixStatus =
	| 'OK'
	| 'INVALID_REQUEST'
	| 'MAX_ELEMENTS_EXCEEDED'
	| 'OVER_QUERY_LIMIT'
	| 'REQUEST_DENIED'
	| 'UNKNOWN_ERROR'
	| 'MAX_DIMENSIONS_EXCEEDED'
	| 'OVER_DAILY_LIMIT'

type DistanceMatrixElementStatus =
	| 'OK'
	| 'NOT_FOUND'
	| 'ZERO_RESULTS'
	| 'MAX_ROUTE_LENGTH_EXCEEDED'
