import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { GetOwnDestinationsService } from '~/features/my-destinations/api/get-own-destinations.service'
import { CreateTravelStoreService } from '~/features/travels/create-travel-store.service'
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
	destinations: Destination[] = []

	constructor(
		private readonly getOwnDestinationsService: GetOwnDestinationsService,
		private readonly createTravelStoreService: CreateTravelStoreService,
		private readonly router: Router
	) {}

	ngOnInit() {
		this.getOwnDestinationsService.execute().subscribe((res) => {
			this.destinations = res.data
		})
	}

	handleDestinationSelection(destination: Destination) {
		this.createTravelStoreService.destinationId = destination.id

		this.router.navigate(['/app/route-from-ucab-selection'], {
			queryParams: { destinationId: destination.id },
			queryParamsHandling: 'merge'
		})
	}
}
