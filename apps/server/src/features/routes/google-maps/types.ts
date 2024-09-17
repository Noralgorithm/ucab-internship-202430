import { XOR } from 'ts-xor'
import { GeoJsonLineString } from '../types'

export interface GoogleMapsComputeRoutesResponseBody<
	T extends GoogleMapsRoute
> {
	routes: T[]
	fallbackInfo?: GoogleMapsFallbackInfo
}

export interface GoogleMapsFallbackInfo {
	routingMode: GoogleMapsFallbackRoutingMode
	reason: GoogleMapsFallbackReason
}

export type GoogleMapsFallbackRoutingMode =
	| 'FALLBACK_TRAFFIC_UNAWARE'
	| 'FALLBACK_TRAFFIC_AWARE'

export type GoogleMapsFallbackReason =
	| 'FALLBACK_REASON_UNSPECIFIED'
	| 'SERVER_ERROR'
	| 'LATENCY_EXCEEDED'

export interface GoogleMapsRoute {
	distanceMeters: number
	duration: string
	polyline: GoogleMapsPolyline
	description: string
	optimizedIntermediateWaypointIndex?: number[]
}

export interface GoogleMapsRouteWithLegs extends GoogleMapsRoute {
	legs: GoogleMapsRouteLeg[]
}

export interface GoogleMapsRouteLeg {
	distanceMeters: number
	duration: string
	polyline: GoogleMapsPolyline
	startLocation: GoogleMapsLocation
	endLocation: GoogleMapsLocation
}

export type GoogleMapsPolyline = XOR<
	GoogleMapsEncodedPolyline,
	GeoJsonLineString
>

export interface GoogleMapsEncodedPolyline {
	encodedPolyline: string
}

export interface GoogleMapsComputeRoutesRequest {
	origin: GoogleMapsWaypoint
	destination: GoogleMapsWaypoint
	intermediates?: GoogleMapsIntermediateWaypoint[]
	travelMode: GoogleMapsTravelMode
	routingPreference: GoogleMapsRoutingPreference
	polylineQuality: GoogleMapsPolylineQuality
	polylineEncoding: GoogleMapsPolylineEncoding
	computeAlternativeRoutes?: boolean
	languageCode?: string
	units: GoogleMapsUnits
	optimizeWaypointOrder?: boolean
	trafficModel?: GoogleMapsTrafficModel
}

/**
 * A maps waypoint can be a place id waypoint, an address waypoint or a location waypoint, but they are mutually exclusive
 */
export type GoogleMapsWaypoint = XOR<
	GoogleMapsLocationWaypoint,
	GoogleMapsPlaceIdWaypoint,
	GoogleMapsAddressWaypoint
> & { sideOfRoad?: boolean }

/**
 * A maps intermediate waypoint can be a place id waypoint, an address waypoint or a location waypoint, but they are mutually exclusive
 */
export type GoogleMapsIntermediateWaypoint = XOR<
	GoogleMapsLocationWaypoint,
	GoogleMapsPlaceIdWaypoint,
	GoogleMapsAddressWaypoint
> & { sideOfRoad?: boolean; via: boolean }

export interface GoogleMapsLocationWaypoint {
	location: GoogleMapsLocation
	vehicleStopover?: boolean
}

export interface GoogleMapsPlaceIdWaypoint {
	placeId: string
}

export interface GoogleMapsAddressWaypoint {
	address: string
}

export interface GoogleMapsLocation {
	latLng: {
		latitude: number
		longitude: number
	}
	heading?: number
}

export type GoogleMapsTravelMode =
	| 'TRAVEL_MODE_UNSPECIFIED'
	| 'DRIVE'
	| 'BICYCLE'
	| 'WALK'
	| 'TWO_WHEELER'
	| 'TRANSIT'

export type GoogleMapsRoutingPreference =
	| 'ROUTING_PREFERENCE_UNSPECIFIED'
	| 'TRAFFIC_UNAWARE'
	| 'TRAFFIC_AWARE'
	| 'TRAFFIC_AWARE_OPTIMAL'

export type GoogleMapsPolylineQuality =
	| 'POLYLINE_QUALITY_UNSPECIFIED'
	| 'HIGH_QUALITY'
	| 'OVERVIEW'

export type GoogleMapsPolylineEncoding =
	| 'POLYLINE_ENCODING_UNSPECIFIED'
	| 'ENCODED_POLYLINE'
	| 'GEO_JSON_LINESTRING'

export type GoogleMapsUnits = 'UNITS_UNSPECIFIED' | 'METRIC' | 'IMPERIAL'

export type GoogleMapsTrafficModel =
	| 'TRAFFIC_MODEL_UNSPECIFIED'
	| 'BEST_GUESS'
	| 'OPTIMISTIC'
	| 'PESSIMISTIC'
