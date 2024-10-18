import { Component } from '@angular/core'
import { Router } from '@angular/router'
import {
	CreateTravelService,
	RouteDto
} from '~/features/travels/api/create-travel.service'
import { CreateTravelStoreService } from '~/features/travels/create-travel-store.service'
import { GeoJsonLineString } from '~/shared/types/maps/geo-json-line-string.type'
import { Route } from '~/shared/types/travels/route.type'
import { TravelType } from '~/shared/types/travels/travel.type'
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
	constructor(
		private readonly createTravelService: CreateTravelService,
		private readonly createTravelStoreService: CreateTravelStoreService,
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
				this.router.navigate(['/app/travel-lobby'])
			})
	}
}
