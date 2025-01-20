import { GeoJsonLineString } from '~/features/routes/types'
import { GeoJsonPoint } from '~/shared/types'

export type Origin = GeoJsonPoint | GeoJsonLineString
export type Destination = GeoJsonPoint | GeoJsonLineString

export interface DistanceMatrix {
	origin: Origin
	destination: Destination
	distance: number
	duration: string
}

export interface DistanceMatrixStrategy {
	get({
		origins,
		destinations
	}: {
		origins: Origin[]
		destinations: Destination[]
	}): Promise<DistanceMatrix[]>
}

// This is a symbol to be used as a provider token
export const DistanceMatrixStrategy = Symbol('DistanceMatrixStrategy')
