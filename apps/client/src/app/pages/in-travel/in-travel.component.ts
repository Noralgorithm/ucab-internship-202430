import { Component } from '@angular/core'
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'

@Component({
	selector: 'app-in-travel',
	standalone: true,
	imports: [GoogleMap, MapMarker, MapPolyline, ButtonComponent],
	templateUrl: './in-travel.component.html',
	styleUrl: './in-travel.component.css'
})
export class InTravelComponent {
	passengers: MarkerPassengers = [
		{
			destinationMarkerPosition: { lat: 40.73061, lng: -73.935242 }
		},
		{
			destinationMarkerPosition: { lat: 34.052235, lng: -118.243683 }
		},
		{
			destinationMarkerPosition: { lat: 51.507351, lng: -0.127758 }
		}
	]
	sendEmergencymessage() {
		alert('AYUDA ME SECUESTRARON')
	}

	options: google.maps.MapOptions = {
		streetViewControl: false
	}

	markerOptions: google.maps.MarkerOptions = {
		draggable: false
	}
}

type MarkerPassengers = {
	destinationMarkerPosition: google.maps.LatLngLiteral
}[]
