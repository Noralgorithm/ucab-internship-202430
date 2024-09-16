import { Component } from '@angular/core'
import { GoogleMap, MapMarker } from '@angular/google-maps'
import { UcabLocationService } from '~/features/maps/ucab-location.service'

@Component({
	selector: 'location-selector-map',
	standalone: true,
	imports: [GoogleMap, MapMarker],
	templateUrl: './location-selector-map.component.html',
	styleUrl: './location-selector-map.component.css'
})
export class LocationSelectorMapComponent {
	constructor(readonly ucabLocationService: UcabLocationService) {}

	center: google.maps.LatLngLiteral = {
		lat: 8.2973336,
		lng: -62.7114084
	}
	zoom = 4
	markerOptions: google.maps.MarkerOptions = { draggable: false }
	markerPosition: google.maps.LatLngLiteral = {
		lat: 0,
		lng: 0
	}

	addMarker(event: google.maps.MapMouseEvent) {
		if (event.latLng) {
			this.markerPosition = event.latLng.toJSON()
		}
	}
}
