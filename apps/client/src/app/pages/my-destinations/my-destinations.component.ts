import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LocationSelectorMapComponent } from '~/features/maps/components/location-selector-map/location-selector-map.component'
import { DeleteOwnDestinationService } from '~/features/my-destinations/api/delete-own-destination.service'
import { GetOwnDestinationsService } from '~/features/my-destinations/api/get-own-destinations.service'
import { CardMyDestinationComponent } from '~/features/my-destinations/components/card-my-destination/card-my-destination.component'
import { Destination } from '~/shared/types/maps/destination'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { ModalComponent } from '~/shared/ui/components/modal/modal.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'
import { TextInputComponent } from '../../shared/ui/components/text-input/text-input.component'

@Component({
	selector: 'app-my-destinations',
	standalone: true,
	imports: [
		PageLayoutComponent,
		LocationSelectorMapComponent,
		ModalComponent,
		TextInputComponent,
		CardMyDestinationComponent,
		PageLayoutComponent,
		ButtonComponent,
		RouterLink
	],
	templateUrl: './my-destinations.component.html',
	styleUrls: ['./my-destinations.component.css']
})
export class MyDestinationsComponent {
	destinations: Destination[] = []

	constructor(
		private readonly getOwnDestinationsService: GetOwnDestinationsService,
		private readonly deleteOwnDestinationService: DeleteOwnDestinationService
	) {}

	ngOnInit() {
		this.getOwnDestinationsService.execute().subscribe({
			next: (res) => {
				this.destinations = res.data
			}
		})
	}

	handleDelete(destinationId: string) {
		this.deleteOwnDestinationService.execute(destinationId).subscribe({
			next: () => {
				this.destinations = this.destinations.filter(
					(destination) => destination.id !== destinationId
				)
			}
		})
	}
}
