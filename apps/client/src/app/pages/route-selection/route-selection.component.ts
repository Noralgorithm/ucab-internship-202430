import { Component } from '@angular/core'
import { GoogleMap, MapMarker, MapPolyline } from '@angular/google-maps'
import { ComputeRoutesService } from '~/features/maps/api/compute-routes.service'
import { LocationSelectorMapComponent } from '~/features/maps/components/location-selector-map/location-selector-map.component'
import { OwnLocationService } from '~/features/maps/own-location.service'
import { UCAB_LATITUDE, UCAB_LONGITUDE } from '~/shared/constants'
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
	templateUrl: './route-selection.component.html',
	styleUrl: './route-selection.component.css'
})
export class RouteSelectionComponent {
	routes: Route[] = []

	constructor(
		private readonly computeRoutesService: ComputeRoutesService,
		private readonly ownLocationService: OwnLocationService
	) {}

	async computeRoutes() {
		this.ownLocationService.$location.subscribe((position) => {
			this.computeRoutesService
				.toUcab({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				})
				.subscribe((res) => {
					this.routes = res.data.map((route) => ({
						vertices: geoJsonLineStringToLatLng(
							route.polyline.geoJsonLinestring
						),
						selected: false
					}))

					if (this.routes.length > 0) this.routes[0].selected = true
				})
		})
	}

	handlePolylineClick(route: Route) {
		for (const r of this.routes) {
			r.selected = false
		}
		route.selected = true
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
}

interface Route {
	vertices: google.maps.LatLngLiteral[]
	selected: boolean
}
