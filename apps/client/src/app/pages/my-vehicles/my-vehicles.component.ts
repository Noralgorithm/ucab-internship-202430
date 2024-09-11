import { Component } from '@angular/core'
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
export class MyVehiclesComponent {}
