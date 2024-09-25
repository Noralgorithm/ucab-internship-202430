/**
 * Coords is a simple interface to represent a pair of latitude and longitude
 * @interface Coords
 * @field latitude - Latitude must be a number between -90.0 and +90.0
 * @field longitude - Longitude must be a number between -180.0 and +180.0
 */
export interface Coords {
	/**
	 * Latitude must be a number between -90.0 and +90.0
	 * @type {number}
	 */
	latitude: number
	/**
	 * Longitude must be a number between -180.0 and +180.0
	 * @type {number}
	 */
	longitude: number
}

/**
 * A geographic point, and an optional heading
 * @interface Location
 * @field coords - The geographic coordinates of the location
 * @field heading - The heading of the location in degrees associated with the direction of the flow of traffic. Heading values can be from 0 to 360, where 0 is north, 90 is east, 180 is south, and 270 is west
 */
export interface Location {
	/**
	 * The geographic coordinates of the location
	 * @type {Coords}
	 */
	coords: Coords
	/**
	 * The heading of the location in degrees associated with the direction of the flow of traffic. Heading values can be from 0 to 360, where 0 is north, 90 is east, 180 is south, and 270 is west
	 * @type {number}
	 */
	heading?: number
}

/**
 * A location in which the route starts or ends
 */
export interface Waypoint {
	location: Location
}

/**
 * An intermediate location that the route must pass through
 */
export interface IntermediateWaypoint {
	location: Location
	via: boolean
	vehicleStopover?: boolean
	sideOfRoad?: boolean
}

/**
 * A route between two or more locations, joining beginning, ending and intermediate waypoints
 */
export interface Route {
	distance: number
	duration: string
	description: string
	polyline: Polyline
}

/**
 * A representation of a route in an easy-to-use format
 */
export type Polyline = string | GeoJsonLineString

//TODO: add GeoJson related types (https://datatracker.ietf.org/doc/html/rfc7946)
export type GeoJsonLineString = object

export interface RoutesService {
	/**
	 * Creates a route between multiple locations and waypoints, with transportation mode set to driving (by car)
	 * @param origin The starting point of the route
	 * @param destination The ending point of the route
	 * @param waypoints Intermediate points that the route must pass through
	 * @returns A promise that resolves to a route object
	 * @throws {NoRoutesFoundError} If no route could be found between the given locations
	 */
	createDriveRoute(
		origin: Waypoint,
		destination: Waypoint,
		...waypoints: IntermediateWaypoint[]
	): Promise<Route>
}

// This is a symbol to be used as a provider token
export const RoutesService = Symbol('RoutesService')
