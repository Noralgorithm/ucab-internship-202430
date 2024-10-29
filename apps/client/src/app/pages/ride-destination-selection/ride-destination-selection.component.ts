import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { GetOwnDestinationsService } from '~/features/my-destinations/api/get-own-destinations.service'
import { Destination } from '~/shared/types/maps/destination'
import { CardMyDestinationComponent } from '../../features/my-destinations/components/card-my-destination/card-my-destination.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-ride-destination-selection',
	standalone: true,
	imports: [PageLayoutComponent, CardMyDestinationComponent],
	templateUrl: './ride-destination-selection.component.html',
	styleUrl: './ride-destination-selection.component.css'
})
export class RideDestinationSelectionComponent {
	destinations: Destination[] = []

	constructor(
		private readonly getOwnDestinationsService: GetOwnDestinationsService,
		private readonly router: Router
	) {}

	ngOnInit() {
		this.getOwnDestinationsService.execute().subscribe((res) => {
			this.destinations = res.data
		})
	}

	handleDestinationSelection(destination: Destination) {
		this.router.navigate(['/app/available-drivers'], {
			queryParams: { did: destination.id },
			queryParamsHandling: 'merge'
		})
	}
}
