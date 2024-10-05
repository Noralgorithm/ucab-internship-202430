import { Component } from '@angular/core'
import { ComputeRoutesService } from '~/features/maps/api/compute-routes.service'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-route-selection',
	standalone: true,
	imports: [PageLayoutComponent],
	templateUrl: './route-selection.component.html',
	styleUrl: './route-selection.component.css'
})
export class RouteSelectionComponent {
	constructor(private readonly computeRoutesService: ComputeRoutesService) {}

	computeRoutes() {
		this.computeRoutesService
			.execute({ lat: 0, lng: 0 }, { lat: 0, lng: 0 })
			.subscribe({
				next: (res) => {
					console.log(res)
				}
			})
	}
}
