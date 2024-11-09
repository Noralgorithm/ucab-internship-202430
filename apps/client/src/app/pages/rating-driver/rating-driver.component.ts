import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
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
	ride: RideTravelData | null = null
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
		private readonly getRideService: GetRideService
	) {
		this.route.queryParams.subscribe((params) => {
			this.rideId = params['id']
		})
	}

	ngOnInit() {
		this.getRideService.execute(this.rideId).subscribe({
			next: (res) => {
				this.ride = res.data
				console.log('viaje obtenido')
			},
			error: () => {
				console.log('error obteniendo el viaje')
			}
		})
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
					console.log('Ride finished')
				},
				error: () => {
					console.log('Error finishing ride')
				}
			})
		})
	}
}
