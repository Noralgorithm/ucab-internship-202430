import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Subscription, interval, mergeMap } from 'rxjs'
import { AnswerRideRequestService } from '~/features/rides/api/answer-ride-request.service'
import { CancelTravelService } from '~/features/travels/api/cancel-travel.service'
import { GetTravelByIdService } from '~/features/travels/api/get-travel-by-id.service'
import { StartTravelService } from '~/features/travels/api/start-travel.service'
import { VehiclesColorsService } from '~/features/vehicles/vehicles-colors.service'
import { Ride } from '~/shared/types/rides/ride-request.type'
import { TravelLobbyData } from '~/shared/types/travels/travel.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { getFirstLastName } from '~/shared/utils/get-first-last-name'
import { getFirstName } from '~/shared/utils/get-first-name'
import { VehicleImageComponent } from '../../features/vehicles/components/vehicle-image/vehicle-image.component'
import { ModalComponent } from '../../shared/ui/components/modal/modal.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

const REFETCH_WAIT_TIME_IN_MS = 1000

@Component({
	selector: 'app-travel-lobby',
	standalone: true,
	imports: [
		PageLayoutComponent,
		VehicleImageComponent,
		ButtonComponent,
		ModalComponent
	],
	templateUrl: './travel-lobby.component.html',
	styleUrl: './travel-lobby.component.css'
})
export class TravelLobbyComponent {
	travel: TravelLobbyData | null = null
	acceptedRequests: Ride[] = []
	pendingRequests: Ride[] = []

	isPendingRequestsModalOpen = false

	travelSubscription: Subscription | null = null

	isCancelTravelModalOpen = false

	firtName = ''

	lastName = ''

	constructor(
		private readonly getTravelByIdService: GetTravelByIdService,
		public readonly vehiclesColorService: VehiclesColorsService,
		private readonly router: Router,
		private readonly answerRideRequestService: AnswerRideRequestService,
		private readonly startTravelService: StartTravelService,
		private readonly toastr: ToastrService,
		private readonly route: ActivatedRoute,
		private readonly cancelTravelService: CancelTravelService
	) {
		this.route.queryParams.subscribe((params) => {
			const travelId = params['id'] as string

			this.travelSubscription = interval(REFETCH_WAIT_TIME_IN_MS)
				.pipe(
					mergeMap(() => this.getTravelByIdService.execute(travelId, false))
				)
				.subscribe({
					next: (res) => {
						this.travel = res.data
						this.acceptedRequests = this.travel.rides.filter(
							(ride) => ride.isAccepted
						)
						this.pendingRequests = this.travel.rides.filter(
							(ride) => ride.isAccepted === null
						)

						if (this.travel.status === 'in-progress') {
							this.router.navigate(['/in-travel'], {
								queryParams: {
									id: this.travel?.id
								}
							})
						}
					},
					error: () => {
						this.router.navigate(['/app'])
					}
				})
		})
	}

	ngOnDestroy() {
		this.travelSubscription?.unsubscribe()
	}

	startTravel() {
		if (!this.travel) return

		if (this.acceptedRequests.length === 0) {
			this.toastr.error('No se puede iniciar un viaje sin pasajeros')
			return
		}

		this.startTravelService.execute({ travelId: this.travel.id }).subscribe({
			next: () => {
				this.router.navigate(['/in-travel'], {
					queryParams: {
						id: this.travel?.id
					},
					queryParamsHandling: 'preserve'
				})
			},
			error: () => {
				this.toastr.error('Ha ocurrido un error al iniciar el viaje')
			}
		})
	}

	openCancelTravelModal() {
		this.isCancelTravelModalOpen = true
	}

	openPendingRequestsModal() {
		this.isPendingRequestsModalOpen = true
	}

	cancelTravel() {
		if (!this.travel) return
		this.cancelTravelService
			.execute({ travelId: this.travel.id, reason: 'driver-canceled' })
			.subscribe({
				next: () => {
					this.toastr.success('Viaje cerrado con éxito')
					this.router.navigate(['/app'])
				},
				error: () => {
					this.toastr.error('Error cerrando el viaje')
				}
			})
	}

	showFirstName(fullName: string) {
		return getFirstName(fullName)
	}

	showFirstLastName(fullLastName: string) {
		return getFirstLastName(fullLastName)
	}

	acceptRideRequest(request: Ride) {
		this.answerRideRequestService
			.execute(request.id, {
				isAccepted: true
			})
			.subscribe({
				next: () => {
					this.acceptedRequests.push(request)
					this.pendingRequests = this.pendingRequests.filter(
						(ride) => ride.id !== request.id
					)
				}
			})
	}

	rejectRideRequest(request: Ride) {
		this.answerRideRequestService
			.execute(request.id, {
				isAccepted: false,
				travelCancelType: 'driver-denial'
			})
			.subscribe({
				next: () => {
					this.pendingRequests = this.pendingRequests.filter(
						(ride) => ride.id !== request.id
					)
				}
			})
	}

	redirectToChat(rideId: string) {
		this.router.navigate(['/chat'], {
			queryParams: {
				rideId: rideId
			},
			queryParamsHandling: 'merge'
		})
	}

	roundToOneDecimal(rating: number) {
		return Number.parseFloat(rating.toFixed(1))
	}
}
