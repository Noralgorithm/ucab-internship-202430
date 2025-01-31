import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { DriverCardComponent } from '~/features/drivers/components/driver-card/driver-card.component'
import { OwnLocationService } from '~/features/maps/own-location.service'
import { GetDestinationService } from '~/features/my-destinations/api/get-destination.service'
import { RequestRideService } from '~/features/rides/api/request-ride.service'
import { GetTravelAvailableDrivers } from '~/features/travels/api/get-travel-available-drivers.service'
import { GENDER_KEY } from '~/shared/constants'
import { Ride } from '~/shared/types/rides/ride-request.type'
import { TravelAvailableDriverData } from '~/shared/types/travels/travel.type'
import { Gender } from '~/shared/types/users/user-gender.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-available-drivers',
	standalone: true,
	imports: [
		PageLayoutComponent,
		DriverCardComponent,
		RouterLink,
		ButtonComponent
	],
	templateUrl: './available-drivers.component.html',
	styleUrl: './available-drivers.component.css'
})
export class AvailableDriversComponent implements OnInit {
	travels: TravelAvailableDriverData[] = []
	travelType: 'from-ucab' | 'to-ucab' = 'to-ucab'
	destinationId: string | null = null

	destinationLatLng: google.maps.LatLngLiteral | null = null

	optionOnlyWomans = false

	constructor(
		private readonly getTravelAvailableDriversService: GetTravelAvailableDrivers,
		private readonly requestRideService: RequestRideService,
		private readonly ownLocationService: OwnLocationService,
		private readonly getDestinationService: GetDestinationService,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly toastrService: ToastrService
	) {
		this.route.queryParams.subscribe((params) => {
			this.travelType = params['type']
			this.destinationId = params['did']
		})
	}

	ngOnInit() {
		this.getDestinationLatLng()
	}

	getDestinationLatLng() {
		if (!this.destinationId) {
			this.getDrivers()
			return
		}

		this.getDestinationService.execute(this.destinationId).subscribe({
			next: (res) => {
				this.destinationLatLng = {
					lat: Number(res.data.latitude),
					lng: Number(res.data.longitude)
				}
				this.getDrivers()
			}
		})
	}

	handleDriverSelection(travel: TravelAvailableDriverData) {
		if (this.travelType === 'to-ucab') {
			this.ownLocationService.$location.subscribe((location) => {
				this.requestRideService
					.execute({
						travelId: travel.id,
						point: {
							type: 'Point',
							coordinates: [location.coords.longitude, location.coords.latitude]
						}
					})
					.subscribe({
						next: (res) => {
							this.redirectToReview(res.data)
						},
						error: (err) => {
							this.toastrService.error(err.error.message)
						}
					})
			})
		} else if (this.travelType === 'from-ucab') {
			if (!this.destinationId) {
				this.router.navigate(['/app'])
				return
			}

			this.getDestinationService.execute(this.destinationId).subscribe({
				next: (res) => {
					this.requestRideService
						.execute({
							travelId: travel.id,
							point: {
								type: 'Point',
								coordinates: [
									Number(res.data.longitude),
									Number(res.data.longitude)
								]
							}
						})
						.subscribe({
							next: (res) => {
								this.redirectToReview(res.data)
							}
						})
				}
			})
		}
	}

	isAWoman() {
		if (localStorage.getItem(GENDER_KEY) === ('female' as Gender)) return true
		return false
	}

	getDrivers() {
		this.getTravelAvailableDriversService
			.execute({
				isWomanOnly: this.optionOnlyWomans,
				type: this.travelType,
				lat: String(this.destinationLatLng?.lat),
				lng: String(this.destinationLatLng?.lng)
			})
			.subscribe((res) => {
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

	changeOptionOnlyWomans(event: Event) {
		this.optionOnlyWomans = (event.target as HTMLInputElement).checked
		this.getDrivers()
	}

	redirectToReview(ride: Ride) {
		this.router.navigate(['app/waiting-for-review'], {
			queryParams: { id: ride.id },
			queryParamsHandling: 'merge'
		})
	}
}
