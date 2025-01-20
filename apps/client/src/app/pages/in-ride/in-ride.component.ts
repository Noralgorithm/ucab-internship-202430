import { Component, OnInit } from '@angular/core'
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps'
import { ActivatedRoute, Router } from '@angular/router'
import { OwnLocationService } from '~/features/maps/own-location.service'
import { GetOwnProfileService } from '~/features/profile/api/get-own-profile.service'
import { GetRideService } from '~/features/rides/api/get-ride.service'
import { RideTravelData } from '~/shared/types/rides/ride-request.type'
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

	rideId = ''

	vehiclePlate = ''

	currentLocation = {
		lat: '',
		lng: ''
	}

	ride: RideTravelData | null = null

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly getOwnProfileService: GetOwnProfileService,
		private readonly getRideService: GetRideService,
		private readonly ownLocationService: OwnLocationService
	) {
		this.route.queryParams.subscribe((params) => {
			this.rideId = params['id']
		})
	}

	ngOnInit() {
		this.getRideService.execute(this.rideId).subscribe({
			next: (res) => {
				this.ride = res.data
				this.vehiclePlate = res.data.travel.vehicle.plate
			}
		})
		this.getOwnProfileService.execute().subscribe({
			next: (res) => {
				if (!res.data.emergencyContactPhoneNumber) return
				this.emergencyNumber = res.data.emergencyContactPhoneNumber
			}
		})
	}

	redirectToSms() {
		this.ownLocationService.$location.subscribe({
			next: (position) => {
				this.emergencyLink = generateEmergencyLink(
					this.emergencyNumber,
					this.vehiclePlate,
					position.coords.latitude.toString(),
					position.coords.longitude.toString()
				)
				console.log(this.emergencyLink)
				window.location.href = this.emergencyLink
			}
		})
	}

	redirectToRatingDriver() {
		this.router.navigate(['rating-driver'], {
			queryParamsHandling: 'preserve'
		})
	}
}
