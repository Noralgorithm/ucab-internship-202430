import { GeoJsonLineString } from '../types/maps/geo-json-line-string.type'

export const geoJsonLineStringToLatLng = (
	geoJsonLineString: GeoJsonLineString
): google.maps.LatLngLiteral[] => {
	return geoJsonLineString.coordinates.map((coordinate) => ({
		lat: coordinate[1],
		lng: coordinate[0]
	}))
}
