import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { GetRideService } from '~/features/rides/api/get-ride.service'
import { VehicleImageComponent } from '~/features/vehicles/components/vehicle-image/vehicle-image.component'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

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

	constructor(
		private readonly getRideService: GetRideService,
		private readonly router: ActivatedRoute,
		private readonly toast: ToastrService
	) {
		this.router.queryParams.subscribe((params) => {
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
			}
		})
	}
}
