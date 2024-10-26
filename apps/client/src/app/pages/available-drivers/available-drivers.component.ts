import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { DriverCardComponent } from '~/features/drivers/components/driver-card/driver-card.component'
import { OwnLocationService } from '~/features/maps/own-location.service'
import { RequestRideService } from '~/features/rides/api/request-ride.service'
import { GetTravelAvailableDrivers } from '~/features/travels/api/get-travel-available-drivers.service'
import { GENDER_KEY } from '~/shared/constants'
import { TravelAvailableDriverData } from '~/shared/types/travels/travel.type'
import { Gender } from '~/shared/types/users/user-gender.type'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-available-drivers',
	standalone: true,
	imports: [PageLayoutComponent, DriverCardComponent, RouterLink],
	templateUrl: './available-drivers.component.html',
	styleUrl: './available-drivers.component.css'
})
export class AvailableDriversComponent implements OnInit {
	travels: TravelAvailableDriverData[] = []
	travelType: 'from-ucab' | 'to-ucab' = 'from-ucab'

	constructor(
		private readonly getTravelAvailableDriversService: GetTravelAvailableDrivers,
		private readonly requestRideService: RequestRideService,
		private readonly ownLocationService: OwnLocationService,
		private readonly route: ActivatedRoute
	) {
		this.route.queryParams.subscribe((params) => {
			this.travelType = params['type']
		})
	}

	ngOnInit() {
		this.getDrivers()
	}

	handleDriverSelection(travel: TravelAvailableDriverData) {
		this.ownLocationService.$location.subscribe((location) => {
			this.requestRideService
				.execute(
					{
						travelId: travel.id,
						point: {
							type: 'Point',
							coordinates: [location.coords.longitude, location.coords.latitude]
						}
					},
					this.travelType
				)
				.subscribe(() => {})
		})
	}

	isAWoman() {
		if (localStorage.getItem(GENDER_KEY) === ('female' as Gender)) return true
		return false
	}

	getDrivers() {
		this.getTravelAvailableDriversService.execute().subscribe((res) => {
			this.travels = res.data
		})
	}

	getTravelDriverData(travel: TravelAvailableDriverData) {
		return {
			...travel.vehicle.driver,
			passengerAmount: travel.passengerAmount,
			passengerCapacity: travel.availableSeatQuantity
		}
	}
}
