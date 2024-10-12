import { GeoJsonLineString } from '../maps/geo-json-line-string.type'

export interface Route {
	description: string
	distance: number
	duration: string
	polyline: {
		geoJsonLinestring: GeoJsonLineString
	}
}
