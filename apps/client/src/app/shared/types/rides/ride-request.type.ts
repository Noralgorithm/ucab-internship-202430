import { Travel } from '../travels/travel.type'
import { UserProfile } from '../users/user-profile.type'
import { Vehicle } from '../vehicles/vehicle.type'

export interface Ride {
	id: string
	passenger: UserProfile
	isAccepted: boolean
	travelCancelType: string
}

export type RideTravelData = Ride & {
	travel: Travel & {
		vehicle: Vehicle & {
			driver: UserProfile
		}
	}
}

export interface Message {
	id: string
	content: string
	createdAt: string
	updatedAt: string
	deletedAt: string
	isMine: boolean
}

export type RideMessages = {
	driver: UserProfile
	passenger: UserProfile
	messages: Message[]
}
