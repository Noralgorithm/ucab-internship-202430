import { Component } from '@angular/core'
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps'
import { ActivatedRoute, Router } from '@angular/router'
import { OwnLocationService } from '~/features/maps/own-location.service'
import { GetOwnProfileService } from '~/features/profile/api/get-own-profile.service'
import { GetTravelByIdService } from '~/features/travels/api/get-travel-by-id.service'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { generateEmergencyLink } from '~/shared/utils/generate-emergency-link'
import { geoJsonLineStringToLatLng } from '~/shared/utils/geo-json-line-string.util'

@Component({
	selector: 'app-in-travel',
	standalone: true,
	imports: [GoogleMap, MapMarker, MapPolyline, ButtonComponent],
	templateUrl: './in-travel.component.html',
	styleUrl: './in-travel.component.css'
})
export class InTravelComponent {
	travelId: string | null = null

	vertices: google.maps.LatLngLiteral[] = []

	emergencyNumber = ''

	emergencyLink = ''

	vehiclePlate = ''

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

	options: google.maps.MapOptions = {
		streetViewControl: false
	}

	markerOptions: google.maps.MarkerOptions = {
		draggable: false
	}

	constructor(
		private readonly getTravelByIdService: GetTravelByIdService,
		private readonly route: ActivatedRoute,
		private readonly getOwnProfileService: GetOwnProfileService,
		private readonly router: Router,
		private readonly ownLocationService: OwnLocationService
	) {
		this.route.queryParams.subscribe((params) => {
			this.travelId = params['id']
		})
	}

	ngOnInit() {
		if (!this.travelId) {
			return
		}

		this.getTravelByIdService.execute(this.travelId).subscribe({
			next: (res) => {
				this.vertices = geoJsonLineStringToLatLng(
					res.data.route.polyline.geoJsonLinestring
				)
				this.vehiclePlate = res.data.vehicle.plate
			}
		})

		this.getOwnProfileService.execute().subscribe((res) => {
			if (!res.data.emergencyContactPhoneNumber) return
			this.emergencyNumber = res.data.emergencyContactPhoneNumber
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
				window.location.href = this.emergencyLink
			}
		})
	}

	redirectToRatingPassengers() {
		this.router.navigate(['rating-passengers'], {
			queryParamsHandling: 'preserve'
		})
	}
}

type MarkerPassengers = {
	destinationMarkerPosition: google.maps.LatLngLiteral
}[]
