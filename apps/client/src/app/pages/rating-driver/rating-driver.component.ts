import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { OwnLocationService } from '~/features/maps/own-location.service'
import {
	FinishRideService,
	FinishRideServiceDto
} from '~/features/rides/api/finish-ride.service'
import { GetRideService } from '~/features/rides/api/get-ride.service'
import { GeoJsonPoint } from '~/shared/types/maps/geo-json-points.type'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { RatingButtonsComponent } from '~/shared/ui/components/rating-buttons/rating-buttons.component'
import { getFirstLastName } from '~/shared/utils/get-first-last-name'
import { getFirstName } from '~/shared/utils/get-first-name'
import { VehicleImageComponent } from '../../features/vehicles/components/vehicle-image/vehicle-image.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-rating-driver',
	standalone: true,
	imports: [
		PageLayoutComponent,
		VehicleImageComponent,
		ButtonComponent,
		RatingButtonsComponent
	],
	templateUrl: './rating-driver.component.html',
	styleUrl: './rating-driver.component.css'
})
export class RatingDriverComponent implements OnInit {
	ride: RideTravelData | undefined
	selectedRating: number | null = null
	rideId = ''
	ownLocation: GeoJsonPoint = {
		coordinates: [0, 0],
		type: 'Point'
	}

	constructor(
		private readonly finishRideService: FinishRideService,
		private readonly ownLocationService: OwnLocationService,
		private readonly route: ActivatedRoute,
		private readonly getRideService: GetRideService,
		private readonly router: Router,
		private readonly toastrService: ToastrService
	) {
		this.route.queryParams.subscribe((params) => {
			this.rideId = params['id']
		})
	}

	ngOnInit() {
		this.getRideService.execute(this.rideId).subscribe({
			next: (res) => {
				this.ride = res.data
			},
			error: () => {
				this.toastrService.error('Error obteniendo la información de la cola')
			}
		})
	}

	showFirstName(fullName: string) {
		return getFirstName(fullName)
	}

	showFirstLastName(fullLastName: string) {
		return getFirstLastName(fullLastName)
	}

	roundToOneDecimal(rating: number) {
		return Number.parseFloat(rating.toFixed(1))
	}

	onSelectedRating(rating: number) {
		this.selectedRating = rating
	}

	ratingDriver() {
		if (!this.selectedRating) return
		this.ownLocationService.$location.subscribe((position) => {
			this.ownLocation = {
				coordinates: [position.coords.latitude, position.coords.longitude],
				type: 'Point'
			}
			const payload: FinishRideServiceDto = {
				rideId: this.rideId,
				dropOff: this.ownLocation,
				passengerStarRating: this.selectedRating as number,
				passengerCommentAfterRide: 'no comments'
			}
			this.finishRideService.execute(payload).subscribe({
				next: () => {
					this.toastrService.success('Calificación enviada con éxito')
					this.router.navigate(['app'])
				}
			})
		})
	}
}
