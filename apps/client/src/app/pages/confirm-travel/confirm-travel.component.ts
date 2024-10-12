import { Component } from '@angular/core'
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
export class ConfirmTravelComponent {}
