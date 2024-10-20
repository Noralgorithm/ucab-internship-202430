import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { DriverCardComponent } from '~/features/drivers/components/driver-card/driver-card.component'
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

	constructor(
		private readonly getTravelAvailableDriversService: GetTravelAvailableDrivers
	) {}

	ngOnInit() {
		this.getDrivers()
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
