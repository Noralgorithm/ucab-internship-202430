import { RideRequest } from '../rides/ride-request.type'
import { Vehicle } from '../vehicles/vehicle.type'
import { Route } from './route.type'

export interface Travel {
	forWomen: boolean
	type: string
	status: string
	availableSeatQuantity: number
	vehicleId: string
	route: Route
}

export type TravelType = 'to-ucab' | 'from-ucab'

export type TravelStatus = 'not-started' | 'in-progress' | 'finished'

export type TravelLobbyData = Travel & {
	vehicle: Vehicle
	rides: RideRequest[]
}
