import { Component, OnInit } from '@angular/core'
import { GoogleMap, MapMarker } from '@angular/google-maps'
import { ActivatedRoute, Router } from '@angular/router'
import { GetDestinationService } from '~/features/my-destinations/api/get-destination.service'
import { Destination } from '~/shared/types/maps/destination'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'

@Component({
	selector: 'app-see-destination',
	standalone: true,
	imports: [GoogleMap, MapMarker, ButtonComponent],
	templateUrl: './see-destination.component.html',
	styleUrl: './see-destination.component.css'
})
export class SeeDestinationComponent implements OnInit {
	destinationId = ''
	destination: Destination | undefined

	options: google.maps.MapOptions = {
		streetViewControl: false
	}
	center: google.maps.LatLngLiteral | null = null
	markerOptions: google.maps.MarkerOptions = {
		draggable: false
	}
	markerPosition: google.maps.LatLngLiteral | null = null

	constructor(
		private readonly getDestinationService: GetDestinationService,
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) {
		this.route.queryParams.subscribe((params) => {
			this.destinationId = params['id']
		})
	}

	ngOnInit() {
		this.getDestinationService.execute(this.destinationId).subscribe({
			next: (res) => {
				this.destination = {
					...res.data,
					latitude: Number(res.data.latitude),
					longitude: Number(res.data.longitude)
				}
				this.markerPosition = {
					lat: this.destination.latitude,
					lng: this.destination.longitude
				}
			}
		})
	}

	redirectMyDestinations() {
		this.router.navigate(['app/my-destinations'])
	}
}
