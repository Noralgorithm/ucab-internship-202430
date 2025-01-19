import { Component, Input } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
	selector: 'star-rating',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './star-rating.component.html',
	styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
	@Input({ required: true }) rating!: number

	public stars: ('full' | 'half' | 'empty')[] = []

	ngOnInit() {
		this.stars = Array(5)
			.fill(0)
			.map((_, i) => {
				const currentStar = i + 1

				return currentStar <= this.rating
					? 'full'
					: currentStar - this.rating === 0.5
						? 'half'
						: 'empty'
			})
	}

	public imagesSrcs = {
		full: 'assets/svgs/FullStar.svg',
		half: 'assets/svgs/HalfStar.svg',
		empty: 'assets/svgs/EmptyStar.svg'
	}
}
