import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
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
	destinationId: string | null = null

	constructor(private readonly activatedRoute: ActivatedRoute) {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.forWomen = params['forWomen'] === 'true'
			this.type = params['type'] as TravelType
			this.status = params['status'] as TravelStatus
			this.availableSeatQuantity = Number(params['availableSeatQuantity'])
			this.vehicleId = params['vehicleId']
			this.destinationId = params['destinationId']
		})
	}
}

export interface CreateTravelServiceDto extends Travel {}
