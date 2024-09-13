import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { GetOwnVehiclesService } from '~/features/vehicles/services/get-own-vehicles.service'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { CardVehicleComponent } from '~/shared/ui/components/card-vehicle/card-vehicle.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { VehicleImageComponent } from '~/shared/ui/components/vehicle-image/vehicle-image.component'

@Component({
	selector: 'app-my-vehicles',
	standalone: true,
	imports: [
		PageLayoutComponent,
		VehicleImageComponent,
		ButtonComponent,
		CardVehicleComponent,
		RouterLink
	],
	templateUrl: './my-vehicles.component.html',
	styleUrl: './my-vehicles.component.css'
})
export class MyVehiclesComponent {
	constructor(private readonly getOwnVehiclesService: GetOwnVehiclesService) {}

	myVehicles: Vehicle[] = []
	ownVehiclesQuantity = 0

	ngOnInit() {
		this.getOwnVehicles()
	}

	getOwnVehicles() {
		this.getOwnVehiclesService.execute().subscribe((vehicles) => {
			this.myVehicles = vehicles.data
			this.ownVehiclesQuantity = vehicles.data.length
		})
	}
}
