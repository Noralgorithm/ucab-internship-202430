import { Component } from '@angular/core'
import { LocationSelectorMapComponent } from '~/features/maps/components/location-selector-map/location-selector-map.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-my-destinations',
	standalone: true,
	imports: [PageLayoutComponent, LocationSelectorMapComponent],
	templateUrl: './my-destinations.component.html',
	styleUrl: './my-destinations.component.css'
})
export class MyDestinationsComponent {}
