import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { LocationSelectorMapComponent } from '~/features/maps/components/location-selector-map/location-selector-map.component'
import {
	CreateOwnDestinationService,
	CreateOwnDestinationServiceDto
} from '~/features/my-destinations/api/create-own-destination.service'
import { CardMyDestinationComponent } from '~/features/my-destinations/components/card-my-destination/card-my-destination.component'
import { ModalComponent } from '~/shared/ui/components/modal/modal.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { TextInputComponent } from '~/shared/ui/components/text-input/text-input.component'

@Component({
	selector: 'app-add-destination',
	standalone: true,
	imports: [
		PageLayoutComponent,
		LocationSelectorMapComponent,
		ModalComponent,
		TextInputComponent,
		CardMyDestinationComponent,
		PageLayoutComponent
	],
	templateUrl: './add-destination.component.html',
	styleUrl: './add-destination.component.css'
})
export class AddDestinationComponent {
	constructor(
		private readonly createOwnDestinationService: CreateOwnDestinationService,
		private readonly router: Router,
		private readonly toastrService: ToastrService
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
				this.router.navigate(['app/my-destinations'])
			},
			error: (res) => {
				this.toastrService.error('Error al guardar la ubicación')
			}
		})

		this.closeUbicationNameModal()
	}
}
