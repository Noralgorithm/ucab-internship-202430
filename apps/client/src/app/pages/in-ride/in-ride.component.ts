import { Component, OnInit } from '@angular/core'
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps'
import { Router } from '@angular/router'
import { GetOwnProfileService } from '~/features/profile/api/get-own-profile.service'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { generateEmergencyLink } from '~/shared/utils/generate-emergency-link'

@Component({
	selector: 'app-in-ride',
	standalone: true,
	imports: [GoogleMap, MapMarker, MapPolyline, ButtonComponent],
	templateUrl: './in-ride.component.html',
	styleUrl: './in-ride.component.css'
})
export class InRideComponent implements OnInit {
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

	emergencyNumber = ''

	emergencyLink = ''

	constructor(
		private readonly router: Router,
		private readonly getOwnProfileService: GetOwnProfileService
	) {}

	ngOnInit() {
		this.getOwnProfileService.execute().subscribe((res) => {
			if (!res.data.emergencyContactPhoneNumber) return
			this.emergencyNumber = res.data.emergencyContactPhoneNumber
			this.emergencyLink = generateEmergencyLink(this.emergencyNumber)
		})
	}

	redirectToRatingDriver() {
		this.router.navigate(['rating-driver'], {
			queryParamsHandling: 'preserve'
		})
	}
}
