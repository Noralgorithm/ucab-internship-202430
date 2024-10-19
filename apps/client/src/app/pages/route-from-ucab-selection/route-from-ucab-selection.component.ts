import { Component } from '@angular/core'
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps'
import { Router } from '@angular/router'
import { ComputeRoutesService } from '~/features/maps/api/compute-routes.service'
import { GetDestinationService } from '~/features/my-destinations/api/get-destination.service'
import { CreateTravelStoreService } from '~/features/travels/create-travel-store.service'
import { UCAB_LATITUDE, UCAB_LONGITUDE } from '~/shared/constants'
import { Route } from '~/shared/types/travels/route.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { geoJsonLineStringToLatLng } from '~/shared/utils/geo-json-line-string.util'

@Component({
	selector: 'app-external-destination-map-selection',
	standalone: true,
	imports: [GoogleMap, MapMarker, MapPolyline, ButtonComponent],
	templateUrl: './route-from-ucab-selection.component.html',
	styleUrl: './route-from-ucab-selection.component.css'
})
export class RouteFromUcabSelectionComponent {
	routes: ViewableRoute[] = []

	constructor(
		private readonly getDestinationService: GetDestinationService,
		private readonly createTravelStoreService: CreateTravelStoreService,
		private readonly router: Router,
		private readonly computeRoutesService: ComputeRoutesService
	) {}

	ngOnInit() {
		if (!this.createTravelStoreService.destinationId) {
			this.router.navigate(['/app/external-destination-selection'], {
				queryParamsHandling: 'preserve'
			})
			return
		}

		this.getDestinationService
			.execute(this.createTravelStoreService.destinationId)
			.subscribe((res) => {
				this.destinationMarkerPosition = {
					lat: Number(res.data.latitude),
					lng: Number(res.data.longitude)
				}

				this.computeRoutesService
					.fromUcab({
						lat: Number(res.data.latitude),
						lng: Number(res.data.longitude)
					})
					.subscribe((res) => {
						this.routes = res.data.map((route) => ({
							data: route,
							vertices: geoJsonLineStringToLatLng(
								route.polyline.geoJsonLinestring
							),
							selected: false
						}))

						if (this.routes.length > 0) this.routes[0].selected = true
					})
			})
	}

	handlePolylineClick(route: ViewableRoute) {
		for (const r of this.routes) {
			r.selected = false
		}
		route.selected = true
	}

	handleConfirm() {
		const selectedRoute = this.routes.find((r) => r.selected)

		if (selectedRoute) {
			this.createTravelStoreService.route = selectedRoute.data
			this.router.navigate(['/app/confirm-travel'], {
				queryParamsHandling: 'merge'
			})
		}
	}

	options: google.maps.MapOptions = {
		streetViewControl: false
	}
	center: google.maps.LatLngLiteral = {
		lat: UCAB_LATITUDE,
		lng: UCAB_LONGITUDE
	}

	markerOptions: google.maps.MarkerOptions = {
		draggable: false
	}
	ucabMarkerPosition: google.maps.LatLngLiteral = {
		lat: UCAB_LATITUDE,
		lng: UCAB_LONGITUDE
	}

	destinationMarkerPosition: google.maps.LatLngLiteral = {
		lat: 0,
		lng: 0
	}
}

interface ViewableRoute {
	data: Route
	vertices: google.maps.LatLngLiteral[]
	selected: boolean
}
