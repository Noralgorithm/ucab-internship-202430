import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Subscription, interval, mergeMap } from 'rxjs'
import { GetRideService } from '~/features/rides/api/get-ride.service'
import { VehicleImageComponent } from '~/features/vehicles/components/vehicle-image/vehicle-image.component'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { getFirstLastName } from '~/shared/utils/get-first-last-name'
import { getFirstName } from '~/shared/utils/get-first-name'

const REFETCH_WAIT_TIME_IN_MS = 2000

@Component({
	selector: 'app-travel-waiting-room',
	standalone: true,
	imports: [PageLayoutComponent, VehicleImageComponent],
	templateUrl: './travel-waiting-room.component.html',
	styleUrl: './travel-waiting-room.component.css'
})
export class TravelWaitingRoomComponent implements OnInit {
	rideId = ''
	ride: RideTravelData | null = null

	rideSubscription: Subscription | null = null

	constructor(
		private readonly getRideService: GetRideService,
		private readonly route: ActivatedRoute,
		private readonly toast: ToastrService,
		private readonly router: Router
	) {
		this.route.queryParams.subscribe((params) => {
			// TODO: CHANGE THIS POR RIDEid
			this.rideId = params['id'] as string
		})
	}

	ngOnInit() {
		this.getRideService.execute(this.rideId, true).subscribe({
			next: (res) => {
				this.ride = res.data
			},
			error: () => {
				this.toast.error(
					'Ha ocurrido un error al cargar la información del viaje'
				)
				this.router.navigate(['/app'])
			}
		})

		this.rideSubscription = interval(REFETCH_WAIT_TIME_IN_MS)
			.pipe(mergeMap(() => this.getRideService.execute(this.rideId, false)))
			.subscribe({
				next: (res) => {
					if (res.data.travel.status === 'in-progress') {
						this.toast.success('El viaje ha comenzado')
						this.redirectToRide()
						this.rideSubscription?.unsubscribe()
					} else if (res.data.travel.status === 'canceled') {
						this.toast.error('El viaje ha sido cancelado')
						this.router.navigate(['/app'])
						this.rideSubscription?.unsubscribe()
					} else if (res.data.travel.status === 'completed') {
						this.toast.error('Ese viaje ya ha finalizado')
						this.rideSubscription?.unsubscribe()
					}
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

	ngOnDestroy() {
		this.rideSubscription?.unsubscribe()
	}

	redirectToRide() {
		this.router.navigate(['/in-ride'], {
			queryParamsHandling: 'preserve'
		})
	}

	redirectToChat() {
		this.router.navigate(['chat'], {
			queryParams: { rideId: this.ride?.id },
			queryParamsHandling: 'merge'
		})
	}
}
