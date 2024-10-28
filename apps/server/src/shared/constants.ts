import { UCAB_GUAYANA_LOCATION } from '~/features/routes/constants'
import { GeoJsonPoint } from './types'

export enum Gender {
	MALE = 'male',
	FEMALE = 'female'
}

export enum UserType {
	STAFF = 'staff',
	STUDENT = 'student',
	PROFESSOR = 'professor'
}

export enum UserRole {
	PASSENGER = 'passenger',
	DRIVER = 'driver'
}

export enum RouteType {
	TO_UCAB = 'to-ucab',
	FROM_UCAB = 'from-ucab'
}

export const NAME_MAX_LENGTH = 35
export const PASSWORD_MAX_LENGTH = 20
export const PASSWORD_MIN_LENGTH = 8
export const NAME_MIN_LENGTH = 2
export const EMAIL_MAX_LENGTH = 320
export const ENCRYPTED_PASSWORD_LENGTH = 60
export const TEMPLATES_PATH = 'src/shared/templates'
export const WALK_DISTANCE_MAX_VALUE = 150
export const WALK_DISTANCE_MIN_VALUE = 20
export const MIN_PLATE_LENGTH = 6
export const MAX_PLATE_LENGTH = 7
export const BRAND_MAX_LENGTH = 100
export const COLOR_MAX_LENGTH = 100
export const MODEL_MAX_LENGTH = 100
export const VEHICLES_MAX_AMOUNT = 3

export const MIN_LATITUDE = -90
export const MAX_LATITUDE = 90
export const MIN_LONGITUDE = -180
export const MAX_LONGITUDE = 180

export const MIN_HEADING = 0
export const MAX_HEADING = 360

export const MIN_DISTANCE = 0

export const UCAB_EMAIL_REGEX = /^.+@ucab\.edu\.ve$|^.+@est\.ucab\.edu\.ve$/

export const UCAB_GUAYANA_POINT: GeoJsonPoint = {
	type: 'Point',
	coordinates: [
		UCAB_GUAYANA_LOCATION.coords.longitude,
		UCAB_GUAYANA_LOCATION.coords.latitude
	]
}
//TODO: consider moving this to rides constants

export const GOOGLE_MAPS_STATIC_MAPS = {
	url: 'https://maps.googleapis.com/maps/api/staticmap',
	method: 'GET'
}

export const GOOGLE_MAPS_LATAM_SPANISH_LANGUAGE_CODE = 'es-419'

export const MIN_STAR_RATING = 0
export const MAX_STAR_RATING = 5
