import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CreateTravelStoreService } from '~/features/travels/create-travel-store.service'
import { GetOwnVehiclesService } from '~/features/vehicles/api/get-own-vehicles.service'
import { VehiclesColorsService } from '~/features/vehicles/vehicles-colors.service'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { VehicleImageComponent } from '../../features/vehicles/components/vehicle-image/vehicle-image.component'
import { ModalComponent } from '../../shared/ui/components/modal/modal.component'

@Component({
	selector: 'app-offer-travel',
	standalone: true,
	imports: [
		PageLayoutComponent,
		VehicleImageComponent,
		ButtonComponent,
		ModalComponent
	],
	templateUrl: './offer-travel.component.html',
	styleUrl: './offer-travel.component.css'
})
export class OfferTravelComponent {
	constructor(
		private getOwnVehiclesService: GetOwnVehiclesService,
		private createTravelStoreService: CreateTravelStoreService,
		public vehiclesColorsService: VehiclesColorsService,
		private readonly router: Router
	) {}

	myVehicles: Vehicle[] = []
	selectedVehicle: Vehicle | null = null
	seatsCount = 0
	isModalOpen = false

	ngOnInit() {
		this.getOwnVehiclesService.execute().subscribe((res) => {
			this.myVehicles = res.data
		})
	}

	incrementSeatsCount() {
		const seatsCountLimit = this.selectedVehicle?.seatQuantity || 1

		if (this.seatsCount >= seatsCountLimit) {
			return
		}

		this.seatsCount++
	}

	decrementSeatsCount() {
		if (this.seatsCount <= 1) {
			return
		}
		this.seatsCount--
	}

	handleVehicleSelection(vehicle: Vehicle) {
		this.selectedVehicle = vehicle
		this.seatsCount = vehicle.seatQuantity
		this.isModalOpen = true
	}

	handleConfirm() {
		this.createTravelStoreService.vehicleId = String(this.selectedVehicle?.id)
		this.createTravelStoreService.availableSeatQuantity = this.seatsCount

		const routeToNavigate =
			this.createTravelStoreService.type === 'to-ucab'
				? '/app/route-to-ucab-selection'
				: '/app/external-destination-selection'

		this.router.navigate([routeToNavigate], {
			queryParams: {
				vehicleId: this.selectedVehicle?.id,
				availableSeatQuantity: this.seatsCount
			},
			queryParamsHandling: 'merge'
		})
	}
}
