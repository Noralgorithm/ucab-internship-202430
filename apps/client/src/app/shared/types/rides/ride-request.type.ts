import { UserProfile } from '../users/user-profile.type'

export interface RideRequest {
	id: string
	passenger: UserProfile
	isAccepted: boolean
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
