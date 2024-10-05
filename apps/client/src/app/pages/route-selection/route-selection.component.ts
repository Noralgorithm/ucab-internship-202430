import { Component } from '@angular/core'
import { ComputeRoutesService } from '~/features/maps/api/compute-routes.service'
import { UcabLocationService } from '~/features/maps/ucab-location.service'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-route-selection',
	standalone: true,
	imports: [PageLayoutComponent],
	templateUrl: './route-selection.component.html',
	styleUrl: './route-selection.component.css'
})
export class RouteSelectionComponent {
	constructor(
		private readonly computeRoutesService: ComputeRoutesService,
		private readonly ucabLocationService: UcabLocationService
	) {}

	computeRoutes() {
		this.computeRoutesService
			.execute(
				{ lat: 8.3006026, lng: -62.7265213 },
				{
					lat: Number(this.ucabLocationService.getUcabLatitude()),
					lng: Number(this.ucabLocationService.getUcabLongitude())
				}
			)
			.subscribe({
				next: (res) => {
					const formattedRes = res.routes.map((route) => ({
						...route,
						polyline: google.maps.geometry.encoding.decodePath(
							route.polyline.encodedPolyline
						)
					}))
				}
			})
	}
}
