import { FindManyOptions, FindOneOptions } from 'typeorm'
import { RouteType } from '~/shared/constants'
import { User } from '../users/entities/user.entity'
import { RouteEntity } from './entities/route.entity'

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

//TODO: refactor this so Route is a Route<T extends Polyline> where T is the type of the polyline
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
export type Polyline = GeoJsonLineString

/**
 * Extracted from [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.4)
 */
export type GeoJsonLineString = {
	type: 'LineString'
	coordinates: Array<GeoJsonPosition>
}

/**
 * Extracted from [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.1)
 */
export type GeoJsonPosition = [number, number] | [number, number, number]

export interface RoutesService {
	/**
	 * Creates routes between multiple locations and waypoints, with transportation mode set to driving (by car)
	 * @param origin The starting point of the routes
	 * @param destination The ending point of the routes
	 * @param waypoints Intermediate points that the routes must pass through
	 * @param alternativeRoutes Whether to compute alternative routes
	 * @returns A promise that resolves to an array of routes, with only 1 if alternativeRoutes is false, or more than 1 if alternativeRoutes is true
	 * @throws {NoRoutesFoundError} If no route could be found between the given locations
	 */
	createDriveRoute({
		origin,
		destination,
		waypoints,
		alternativeRoutes
	}: {
		origin: Waypoint
		destination: Waypoint
		waypoints?: IntermediateWaypoint[]
		alternativeRoutes?: boolean
	}): Promise<Array<Route>>

	createAndSaveUserDriveRoute({
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
	}): Promise<RouteEntity>

	saveUserRoute({
		route,
		type,
		name,
		user
	}: {
		route: Route
		type: RouteType
		name: string
		user: User
	}): Promise<RouteEntity>

	findOne(options: FindOneOptions<RouteEntity>): Promise<RouteEntity>

	findAll(options?: FindManyOptions<RouteEntity>): Promise<RouteEntity[]>

	takeRoutePhoto({
		route
	}: {
		route: Route
	}): Promise<{ photoFilename: string }>
}

// This is a symbol to be used as a provider token
export const RoutesService = Symbol('RoutesService')
