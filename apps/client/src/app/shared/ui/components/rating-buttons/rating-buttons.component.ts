import { Component, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'rating-buttons',
	standalone: true,
	imports: [],
	templateUrl: './rating-buttons.component.html',
	styleUrl: './rating-buttons.component.css'
})
export class RatingButtonsComponent {
	stars = [false, false, false, false, false]
	@Output() selectedRating = new EventEmitter<number>()

	rate(rating: number): void {
		this.stars = this.stars.map((_, index) => index < rating)
		this.selectedRating.emit(rating)
	}
}
