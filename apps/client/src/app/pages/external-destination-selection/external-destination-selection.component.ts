import { Component } from '@angular/core'
import { Destination } from '~/shared/types/maps/destination'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { CardMyDestinationComponent } from '../../features/my-destinations/components/card-my-destination/card-my-destination.component'

@Component({
	selector: 'app-external-destination-selection',
	standalone: true,
	imports: [PageLayoutComponent, CardMyDestinationComponent],
	templateUrl: './external-destination-selection.component.html',
	styleUrl: './external-destination-selection.component.css'
})
export class ExternalDestinationSelectionComponent {
	destination: Destination = {
		id: '0412',
		name: 'Mi casa',
		latitude: 8.29755988674447,
		longitude: -62.71142547253992
	}
}
