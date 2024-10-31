import { Component } from '@angular/core'
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps'
import { Router } from '@angular/router'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'

@Component({
	selector: 'app-in-ride',
	standalone: true,
	imports: [GoogleMap, MapMarker, MapPolyline, ButtonComponent],
	templateUrl: './in-ride.component.html',
	styleUrl: './in-ride.component.css'
})
export class InRideComponent {
	constructor(private readonly router: Router) {}

	sendEmergencymessage() {
		alert('AYUDA ME SECUESTRARON')
	}

	options: google.maps.MapOptions = {
		streetViewControl: false
	}

	markerOptions: google.maps.MarkerOptions = {
		draggable: false
	}

	destinationMarkerPosition: google.maps.LatLngLiteral = {
		lat: 8.2524,
		lng: -62.784558
	}

	redirectToRatingDriver() {
		this.router.navigate(['rating-driver'], {
			queryParams: {
				rideId: 'rideId'
			}
		})
	}
}
