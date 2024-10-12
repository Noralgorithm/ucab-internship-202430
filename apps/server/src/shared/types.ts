import { GeoJsonPosition } from '~/features/routes/types'

export type Class<T> = new (...args: unknown[]) => T

/**
 * Extracted from [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2)
 */
export type GeoJsonPoint = {
	type: 'Point'
	coordinates: GeoJsonPosition
}
