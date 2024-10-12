import { Component } from '@angular/core'
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps'
import { Router } from '@angular/router'
import { ComputeRoutesService } from '~/features/maps/api/compute-routes.service'
import { LocationSelectorMapComponent } from '~/features/maps/components/location-selector-map/location-selector-map.component'
import { OwnLocationService } from '~/features/maps/own-location.service'
import { CreateTravelStoreService } from '~/features/travels/create-travel-store.service'
import { UCAB_LATITUDE, UCAB_LONGITUDE } from '~/shared/constants'
import { Route } from '~/shared/types/travels/route.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { geoJsonLineStringToLatLng } from '~/shared/utils/geo-json-line-string.util'

@Component({
	selector: 'app-route-selection',
	standalone: true,
	imports: [
		PageLayoutComponent,
		GoogleMap,
		LocationSelectorMapComponent,
		ButtonComponent,
		MapPolyline,
		MapMarker
	],
	templateUrl: './route-to-ucab-selection.component.html',
	styleUrl: './route-to-ucab-selection.component.css'
})
export class RouteSelectionComponent {
	routes: ViewableRoute[] = []

	constructor(
		private readonly computeRoutesService: ComputeRoutesService,
		private readonly ownLocationService: OwnLocationService,
		private readonly router: Router,
		private readonly createTravelStoreService: CreateTravelStoreService
	) {
		this.computeRoutes()
	}

	async computeRoutes() {
		this.ownLocationService.$location.subscribe((position) => {
			this.originMarkerPosition = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}

			this.computeRoutesService
				.toUcab({
					lat: position.coords.latitude,
					lng: position.coords.longitude
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

	originMarkerPosition: google.maps.LatLngLiteral = {
		lat: 0,
		lng: 0
	}
}

interface ViewableRoute {
	data: Route
	vertices: google.maps.LatLngLiteral[]
	selected: boolean
}
