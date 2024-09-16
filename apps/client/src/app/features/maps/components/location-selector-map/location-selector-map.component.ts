import { Component } from '@angular/core'
import { GoogleMap, MapMarker } from '@angular/google-maps'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { UcabLocationService } from '~/features/maps/ucab-location.service'
import { environment } from '~env/environment.development'

@Component({
	selector: 'location-selector-map',
	standalone: true,
	imports: [GoogleMap, MapMarker],
	templateUrl: './location-selector-map.component.html',
	styleUrl: './location-selector-map.component.css'
})
export class LocationSelectorMapComponent {
	mapSrc: SafeResourceUrl

	constructor(
		readonly ucabLocationService: UcabLocationService,
		private readonly sanitizer: DomSanitizer
	) {
		this.ucabLocationService.getUcabLocationString
		const GOOGLE_MAPS_API_KEY = environment.GOOGLE_MAPS_API_KEY
		const unsafeMapSrc = `//www.google.com/maps/embed/v1/place?language=es&key=${GOOGLE_MAPS_API_KEY}&q=${this.ucabLocationService.getUcabLocationString()}`

		this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeMapSrc)
	}

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
