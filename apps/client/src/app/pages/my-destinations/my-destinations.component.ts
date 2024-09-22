import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import {
	CreateOwnDestinationService,
	CreateOwnDestinationServiceDto
} from '~/features/maps/api/create-own-destination.service'
import { LocationSelectorMapComponent } from '~/features/maps/components/location-selector-map/location-selector-map.component'
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
		TextInputComponent
	],
	templateUrl: './my-destinations.component.html',
	styleUrl: './my-destinations.component.css'
})
export class MyDestinationsComponent {
	constructor(
		private readonly createOwnDestinationService: CreateOwnDestinationService
	) {}

	selectedMarkerPosition: google.maps.LatLngLiteral | null = null

	ubicationNameControl = new FormControl('', Validators.required)

	isAdviceModalOpen = true
	isUbicationNameModalOpen = false

	openUbicationNameModal(markerPosition: google.maps.LatLngLiteral) {
		this.selectedMarkerPosition = markerPosition
		this.isUbicationNameModalOpen = true
	}

	closeUbicationNameModal() {
		this.isUbicationNameModalOpen = false
	}

	clearUbicationName() {
		this.ubicationNameControl.reset()
	}

	saveUbicationName() {
		if (!this.selectedMarkerPosition) {
			throw new Error('No marker position selected')
		}

		if (!this.ubicationNameControl.value) {
			throw new Error('No ubication name provided')
		}

		const payload: CreateOwnDestinationServiceDto = {
			latitude: this.selectedMarkerPosition.lat,
			longitude: this.selectedMarkerPosition.lng,
			name: this.ubicationNameControl.value
		}

		this.createOwnDestinationService.execute(payload).subscribe({
			next: (res) => {
				console.log('Destination created', res)
			},
			error: (res) => {
				console.error('Error creating destination', res)
			}
		})

		this.closeUbicationNameModal()
	}
}
