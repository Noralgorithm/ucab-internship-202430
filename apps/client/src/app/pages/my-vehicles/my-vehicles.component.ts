import { Component } from '@angular/core'
import { CarComponent } from '~/shared/ui/components/car/car.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-my-vehicles',
	standalone: true,
	imports: [PageLayoutComponent, CarComponent],
	templateUrl: './my-vehicles.component.html',
	styleUrl: './my-vehicles.component.css'
})
export class MyVehiclesComponent {}
