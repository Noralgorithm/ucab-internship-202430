import { Ride } from '../rides/ride-request.type'
import { UserProfile } from '../users/user-profile.type'
import { Vehicle } from '../vehicles/vehicle.type'
import { Route } from './route.type'

export interface Travel {
	id: string
	forWomen: boolean
	type: TravelType
	status: 'not-started' | 'in-progress' | 'completed' | 'canceled'
	availableSeatQuantity: number
	vehicleId: string
	route: Route
}

export type TravelType = 'to-ucab' | 'from-ucab'

export type TravelStatus = 'not-started' | 'in-progress' | 'finished'

export type TravelAvailableDriverData = Travel & {
	passengerAmount: number
	vehicle: Vehicle & {
		driver: UserProfile
	}
}

export type TravelLobbyData = Travel & {
	vehicle: Vehicle
	rides: Ride[]
}
