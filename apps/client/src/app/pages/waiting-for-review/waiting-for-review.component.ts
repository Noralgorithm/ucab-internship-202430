import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Subscription, interval, mergeMap } from 'rxjs'
import { AnswerRideRequestService } from '~/features/rides/api/answer-ride-request.service'
import { GetRideService } from '~/features/rides/api/get-ride.service'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { DriverCardComponent } from '../../features/drivers/components/driver-card/driver-card.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

const FETCH_WAIT_TIME_IN_MS = 1000

@Component({
	selector: 'app-waiting-for-review',
	standalone: true,
	imports: [PageLayoutComponent, ButtonComponent, DriverCardComponent],
	templateUrl: './waiting-for-review.component.html',
	styleUrl: './waiting-for-review.component.css'
})
export class WaitingForReviewComponent implements OnInit {
	rideId = ''

	subscription: Subscription | null = null

	constructor(
		private readonly getRideService: GetRideService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly toastr: ToastrService,
		private readonly answerRideRequestService: AnswerRideRequestService
	) {
		this.route.queryParams.subscribe((params) => {
			this.rideId = params['id'] as string
		})
	}

	ngOnInit() {
		this.subscription = interval(FETCH_WAIT_TIME_IN_MS)
			.pipe(
				mergeMap(() =>
					this.getRideService.execute(this.rideId as string, false)
				)
			)
			.subscribe((res) => {
				if (res.data.isAccepted === false) {
					this.subscription?.unsubscribe()
					this.toastr.error('El conductor ha rechazado tu solicitud')
					this.router.navigate(['/app/available-drivers'], {
						queryParamsHandling: 'preserve'
					})
				} else if (res.data.isAccepted === true) {
					this.subscription?.unsubscribe()
					this.toastr.success('El conductor ha aceptado tu solicitud')
					this.router.navigate(['/app/travel-waiting-room'], {
						queryParams: { id: this.rideId }
					})
				}
			})
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe()
	}

	cancelReview() {
		this.router.navigate(['/app/available-drivers'], {
			queryParamsHandling: 'preserve'
		})
		this.answerRideRequestService
			.execute(this.rideId, {
				isAccepted: false,
				travelCancelType: 'passenger-denial'
			})
			.subscribe({
				next: () => {
					this.toastr.success('Solicitud cancelada')
				}
			})
	}
}
