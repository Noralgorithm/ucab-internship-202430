import { Component } from '@angular/core'
import { GetOwnVehiclesService } from '~/features/vehicles/services/get-own-vehicles.service'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { CarComponent } from '~/shared/ui/components/car/car.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-my-vehicles',
	standalone: true,
	imports: [PageLayoutComponent, CarComponent, ButtonComponent],
	templateUrl: './my-vehicles.component.html',
	styleUrl: './my-vehicles.component.css'
})
export class MyVehiclesComponent {
	constructor(private readonly getOwnVehiclesService: GetOwnVehiclesService) {}

	myVehicles: Vehicle[] = []

	ngOnInit() {
		this.getOwnVehiclesService.execute().subscribe((vehicles) => {
			this.myVehicles = vehicles.data
			console.log(vehicles)
		})
	}
}
