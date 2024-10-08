import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { DriverCardComponent } from '../../features/drivers/components/driver-card/driver-card.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-waiting-for-review',
	standalone: true,
	imports: [PageLayoutComponent, ButtonComponent, DriverCardComponent],
	templateUrl: './waiting-for-review.component.html',
	styleUrl: './waiting-for-review.component.css'
})
export class WaitingForReviewComponent {
	constructor(private readonly router: Router) {}

	cancelReview() {
		this.router.navigate(['/app/available-drivers'])
	}
}
