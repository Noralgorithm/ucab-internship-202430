export interface Travel {
	forWomen: boolean
	type: string
	status: string
	availableSeatQuantity: number
	vehicleId: string
	routeId: string
}

export type TravelType = 'to-ucab' | 'from-ucab'

export type TravelStatus = 'not-started' | 'in-progress' | 'finished'
