import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { GetTravelByIdService } from '~/features/travels/api/get-travel-by-id.service'
import { TravelLobbyData } from '~/shared/types/travels/travel.type'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'
import { RatingButtonsComponent } from '../../shared/ui/components/rating-buttons/rating-buttons.component'

@Component({
	selector: 'app-rating-passengers',
	standalone: true,
	imports: [PageLayoutComponent, RatingButtonsComponent],
	templateUrl: './rating-passengers.component.html',
	styleUrl: './rating-passengers.component.css'
})
export class RatingPassengersComponent implements OnInit {
	travelId = ''

	travel: TravelLobbyData | undefined

	selectedRating: number | null = null

	constructor(
		private readonly getTravelByIdService: GetTravelByIdService,
		private readonly route: ActivatedRoute
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
			//TODO: ADD TOAST
			error: (err) => {
				console.log('Error obteniendo el viaje')
			}
		})
	}

	onSelectedRating(rating: number) {
		this.selectedRating = rating
	}
}
