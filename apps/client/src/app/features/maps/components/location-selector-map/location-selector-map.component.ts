import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { GoogleMap, MapMarker } from '@angular/google-maps'
import { OwnLocationService } from '~/features/maps/own-location.service'
import { UcabLocationService } from '~/features/maps/ucab-location.service'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { ModalComponent } from '~/shared/ui/components/modal/modal.component'
import { ModalService } from '~/shared/ui/components/modal/modal.service'
import { TextInputComponent } from '~/shared/ui/components/text-input/text-input.component'

@Component({
	selector: 'location-selector-map',
	standalone: true,
	imports: [
		GoogleMap,
		MapMarker,
		ButtonComponent,
		ModalComponent,
		TextInputComponent
	],
	templateUrl: './location-selector-map.component.html',
	styleUrl: './location-selector-map.component.css'
})
export class LocationSelectorMapComponent {
	constructor(
		readonly ucabLocationService: UcabLocationService,
		private readonly ownLocationService: OwnLocationService,
		private readonly modalService: ModalService
	) {}

	formGroup = new FormGroup({
		ubicationName: new FormControl('', Validators.required)
	})

	options: google.maps.MapOptions = {
		streetViewControl: false
	}
	center: google.maps.LatLngLiteral = {
		lat: 8.296479,
		lng: -62.712748
	}
	markerOptions: google.maps.MarkerOptions = {
		draggable: false
	}
	markerPosition: google.maps.LatLngLiteral | null = null

	ngOnInit() {
		this.ownLocationService.$location.subscribe((position) => {
			this.center = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}

			this.markerPosition = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
		})
	}

	addMarker(event: google.maps.MapMouseEvent) {
		if (event.latLng) {
			this.markerPosition = event.latLng.toJSON()
		}
	}

	onSave() {
		this.modalService.openModal()
	}
}
