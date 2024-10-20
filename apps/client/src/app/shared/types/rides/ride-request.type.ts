import { UserProfile } from '../users/user-profile.type'

export interface RideRequest {
	id: string
	passenger: UserProfile
	isAccepted: boolean
}
