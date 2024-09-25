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
