import { Component } from '@angular/core'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { VehicleImageComponent } from '../../features/vehicles/components/vehicle-image/vehicle-image.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-travel-lobby',
	standalone: true,
	imports: [PageLayoutComponent, VehicleImageComponent, ButtonComponent],
	templateUrl: './travel-lobby.component.html',
	styleUrl: './travel-lobby.component.css'
})
export class TravelLobbyComponent {}
