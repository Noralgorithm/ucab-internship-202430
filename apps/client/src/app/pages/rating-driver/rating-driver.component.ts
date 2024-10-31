import { Component } from '@angular/core'
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

	onSelectedRating(rating: number) {
		this.selectedRating = rating
	}

	confirmRating(): void {
		console.log(this.selectedRating)
	}
}
