import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import {
	CompleteTravelService,
	CompleteTravelServiceDto,
	RideRating
} from '~/features/travels/api/complete-travel.service'
import { GetTravelByIdService } from '~/features/travels/api/get-travel-by-id.service'
import { TravelLobbyData } from '~/shared/types/travels/travel.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { getFirstLastName } from '~/shared/utils/get-first-last-name'
import { getFirstName } from '~/shared/utils/get-first-name'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'
import { RatingButtonsComponent } from '../../shared/ui/components/rating-buttons/rating-buttons.component'

@Component({
	selector: 'app-rating-passengers',
	standalone: true,
	imports: [PageLayoutComponent, RatingButtonsComponent, ButtonComponent],
	templateUrl: './rating-passengers.component.html',
	styleUrl: './rating-passengers.component.css'
})
export class RatingPassengersComponent implements OnInit {
	travelId = ''

	travel: TravelLobbyData | undefined

	selectedRating: number[] = []
	rideRating: RideRating[] | undefined = []

	constructor(
		private readonly getTravelByIdService: GetTravelByIdService,
		private readonly route: ActivatedRoute,
		private readonly completeTravelService: CompleteTravelService,
		private readonly toastrService: ToastrService,
		private readonly router: Router
	) {
		this.route.queryParams.subscribe((params) => {
			this.travelId = params['id'] as string
		})
	}

	ngOnInit() {
		this.getTravelByIdService.execute(this.travelId).subscribe({
			next: (res) => {
				this.travel = res.data
			},
			error: (err) => {
				this.toastrService.error('Error obteniendo el viaje')
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

	ratingPassengers() {
		if (!this.rideRating) return
		const payload: CompleteTravelServiceDto = {
			travelId: this.travelId,
			rides: this.rideRating
		}
		this.completeTravelService.execute(payload).subscribe({
			next: () => {
				this.toastrService.success('Calificación enviada con éxito')
				this.router.navigate(['app'])
			}
		})
	}

	onSelectedRating(rating: number, rideId: string) {
		if (!this.rideRating) return
		const existingRatingIndex = this.rideRating.findIndex(
			(ride) => ride.rideId === rideId
		)

		if (existingRatingIndex !== -1) {
			this.rideRating[existingRatingIndex].driverStarRating = rating
		} else {
			this.rideRating.push({
				rideId: rideId,
				driverStarRating: rating,
				driverCommentAfterRide: 'no comments'
			})
		}
	}
}
