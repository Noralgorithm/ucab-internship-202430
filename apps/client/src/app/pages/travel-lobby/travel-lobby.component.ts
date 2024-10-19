import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { GetTravelByIdService } from '~/features/travels/api/get-travel-by-id.service'
import { Travel } from '~/shared/types/travels/travel.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { VehicleImageComponent } from '../../features/vehicles/components/vehicle-image/vehicle-image.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-travel-lobby',
	standalone: true,
	imports: [PageLayoutComponent, VehicleImageComponent, ButtonComponent],
	templateUrl: './travel-lobby.component.html',
	styleUrl: './travel-lobby.component.css'
})
export class TravelLobbyComponent {
	travel: Travel | null = null

	constructor(
		private readonly getTravelByIdService: GetTravelByIdService,
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {
		this.route.queryParams.subscribe((params) => {
			const travelId = params['id'] as string

			this.getTravelByIdService.execute(travelId).subscribe({
				next: (res) => {
					this.travel = res.data
				},
				error: () => {
					this.router.navigate(['/app'])
				}
			})
		})
	}
}
