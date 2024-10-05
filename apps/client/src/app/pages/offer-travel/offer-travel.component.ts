import { Component } from '@angular/core'
import { GetOwnVehiclesService } from '~/features/vehicles/api/get-own-vehicles.service'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { VehicleImageComponent } from '../../features/vehicles/components/vehicle-image/vehicle-image.component'

@Component({
	selector: 'app-offer-travel',
	standalone: true,
	imports: [PageLayoutComponent, VehicleImageComponent, ButtonComponent],
	templateUrl: './offer-travel.component.html',
	styleUrl: './offer-travel.component.css'
})
export class OfferTravelComponent {
	constructor(private getOwnVehiclesService: GetOwnVehiclesService) {}

	myVehicles: Vehicle[] = []

	ngOnInit() {
		this.getOwnVehiclesService.execute().subscribe((res) => {
			this.myVehicles = res.data
		})
	}
}
