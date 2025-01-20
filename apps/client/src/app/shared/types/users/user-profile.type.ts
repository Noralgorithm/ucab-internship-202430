import { Gender } from './user-gender.type'
import { UserRole } from './user-role.type'
import { UserType } from './user-type.type'

export interface UserProfile {
	firstName: string
	lastName: string
	email: string
	gender: Gender
	type: UserType
	walkDistance: number
	preferredRole: UserRole
	profilePicSrc: string
	phoneNumber: string | null
	emergencyContactPhoneNumber: string | null
	isDriver: boolean
	isActive: boolean
	isBlocked: boolean
	rating: number
	amountOfRapes: number
}
