import { Injectable } from '@angular/core'
import { Route } from '~/shared/types/travels/route.type'
import {
	Travel,
	TravelStatus,
	TravelType
} from '~/shared/types/travels/travel.type'

@Injectable({
	providedIn: 'root'
})
export class CreateTravelStoreService {
	forWomen: boolean | null = null
	type: TravelType | null = null
	status: TravelStatus | null = null
	availableSeatQuantity: number | null = null
	vehicleId: string | null = null
	route: Route | null = null
}

export interface CreateTravelServiceDto extends Travel {}
