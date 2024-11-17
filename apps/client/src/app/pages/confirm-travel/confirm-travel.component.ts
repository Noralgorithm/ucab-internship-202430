import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { GetDestinationService } from '~/features/my-destinations/api/get-destination.service'
import {
	CreateTravelService,
	RouteDto
} from '~/features/travels/api/create-travel.service'
import { CreateTravelStoreService } from '~/features/travels/create-travel-store.service'
import { GetVehicleByIdService } from '~/features/vehicles/api/get-vehicle-by-id.service'
import { VehiclesColorsService } from '~/features/vehicles/vehicles-colors.service'
import { GeoJsonLineString } from '~/shared/types/maps/geo-json-line-string.type'
import { Route } from '~/shared/types/travels/route.type'
import { TravelType } from '~/shared/types/travels/travel.type'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { VehicleImageComponent } from '../../features/vehicles/components/vehicle-image/vehicle-image.component'

@Component({
	selector: 'app-confirm-travel',
	standalone: true,
	imports: [PageLayoutComponent, VehicleImageComponent, ButtonComponent],
	templateUrl: './confirm-travel.component.html',
	styleUrl: './confirm-travel.component.css'
})
export class ConfirmTravelComponent {
	externalDestinationName: string | null = null
	vehicle: Vehicle | undefined
	isWomenOnly = false
	isToUcab = false
	seatsQuantity = 0

	constructor(
		private readonly createTravelService: CreateTravelService,
		private readonly createTravelStoreService: CreateTravelStoreService,
		private readonly getDestinationService: GetDestinationService,
		private readonly getVehicleByIdService: GetVehicleByIdService,
		public readonly vehicleColorsService: VehiclesColorsService,
		private readonly router: Router
	) {
		if (!this.createTravelStoreService.route) {
			const routeToRedirect =
				this.createTravelStoreService.type === 'to-ucab'
					? '/app/route-to-ucab-selection'
					: '/app/route-from-ucab-selection'

			this.router.navigate([routeToRedirect], {
				queryParamsHandling: 'merge'
			})
		}

		this.isWomenOnly = this.createTravelStoreService.forWomen as boolean
		this.isToUcab = this.createTravelStoreService.type === 'to-ucab'
		this.seatsQuantity = this.createTravelStoreService
			.availableSeatQuantity as number
	}

	ngOnInit() {
		if (this.createTravelStoreService.vehicleId) {
			this.getVehicleByIdService
				.execute(this.createTravelStoreService.vehicleId)
				.subscribe((res) => {
					this.vehicle = res.data
				})
		}

		if (
			this.createTravelStoreService.type === 'from-ucab' &&
			this.createTravelStoreService.destinationId
		) {
			this.getDestinationService
				.execute(this.createTravelStoreService.destinationId)
				.subscribe((res) => {
					this.externalDestinationName = res.data.name
				})
		}
	}

	handleConfirm() {
		const routeDto: RouteDto = {
			...(this.createTravelStoreService.route as Route),
			polyline: {
				coordinates: this.createTravelStoreService.route?.polyline
					.geoJsonLinestring.coordinates as GeoJsonLineString['coordinates'],
				type: 'LineString'
			}
		}

		this.createTravelService
			.execute({
				availableSeatQuantity: this.createTravelStoreService
					.availableSeatQuantity as number,
				forWomen: this.createTravelStoreService.forWomen as boolean,
				route: routeDto,
				status: 'not-started',
				type: this.createTravelStoreService.type as TravelType,
				vehicleId: this.createTravelStoreService.vehicleId as string
			})
			.subscribe((res) => {
				this.router.navigate(['/app/travel-lobby'], {
					queryParams: { id: res.data.id }
				})
			})
	}
}
