import { Component } from '@angular/core'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'
import { VehicleImageComponent } from '../../features/vehicles/components/vehicle-image/vehicle-image.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-rating-driver',
	standalone: true,
	imports: [PageLayoutComponent, VehicleImageComponent],
	templateUrl: './rating-driver.component.html',
	styleUrl: './rating-driver.component.css'
})
export class RatingDriverComponent {
	ride: RideTravelData | null = null
}
