import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { interval, mergeMap } from 'rxjs'
import { AnswerRideRequestService } from '~/features/rides/api/answer-ride-request.service'
import { GetTravelByIdService } from '~/features/travels/api/get-travel-by-id.service'
import { VehiclesColorsService } from '~/features/vehicles/vehicles-colors.service'
import { Ride } from '~/shared/types/rides/ride-request.type'
import { TravelLobbyData } from '~/shared/types/travels/travel.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
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

	constructor(
		private readonly getTravelByIdService: GetTravelByIdService,
		public readonly vehiclesColorService: VehiclesColorsService,
		private readonly router: Router,
		private readonly answerRideRequestService: AnswerRideRequestService,
		private readonly route: ActivatedRoute
	) {
		this.route.queryParams.subscribe((params) => {
			const travelId = params['id'] as string

			interval(REFETCH_WAIT_TIME_IN_MS)
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
					},
					error: () => {
						this.router.navigate(['/app'])
					}
				})
		})
	}

	openPendingRequestsModal() {
		this.isPendingRequestsModalOpen = true
	}

	acceptRideRequest(request: Ride) {
		this.answerRideRequestService
			.execute(request.id, { isAccepted: true })
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
			.execute(request.id, { isAccepted: false })
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
			}
		})
	}
}
