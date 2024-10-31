import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OwnLocationService } from '~/features/maps/own-location.service'
import {
	FinishRideService,
	FinishRideServiceDto
} from '~/features/rides/api/finish-ride.service'
import { GeoJsonPoint } from '~/shared/types/maps/geo-json-points.type'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { RatingButtonsComponent } from '~/shared/ui/components/rating-buttons/rating-buttons.component'
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
export class RatingDriverComponent {
	ride: RideTravelData | null = null
	stars = [false, false, false, false, false]
	selectedRating = 0
	rideId = ''
	ownLocation: GeoJsonPoint = {
		coordinates: [0, 0],
		type: 'Point'
	}

	constructor(
		private readonly finishRideService: FinishRideService,
		private readonly ownLocationService: OwnLocationService,
		private readonly route: ActivatedRoute
	) {
		this.route.params.subscribe((params) => {
			this.rideId = params['rideId']
		})
	}

	onSelectedRating(rating: number) {
		this.selectedRating = rating
	}

	ratingDriver() {
		this.ownLocationService.$location.subscribe((position) => {
			this.ownLocation = {
				coordinates: [position.coords.latitude, position.coords.longitude],
				type: 'Point'
			}
		})
		const payload: FinishRideServiceDto = {
			rideId: this.rideId,
			dropOff: this.ownLocation,
			passengerStarRating: this.selectedRating,
			passengerCommentAfterRide: 'no comments'
		}
		this.finishRideService.execute(payload).subscribe({
			next: (res) => {
				console.log('Ride finished')
			},
			error: (err) => {
				console.log('Error finishing ride')
			}
		})
	}
}
