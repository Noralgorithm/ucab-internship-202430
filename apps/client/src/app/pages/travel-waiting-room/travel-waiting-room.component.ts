import { Component } from '@angular/core'
import { VehicleImageComponent } from '~/features/vehicles/components/vehicle-image/vehicle-image.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-travel-waiting-room',
	standalone: true,
	imports: [PageLayoutComponent, VehicleImageComponent],
	templateUrl: './travel-waiting-room.component.html',
	styleUrl: './travel-waiting-room.component.css'
})
export class TravelWaitingRoomComponent {}
