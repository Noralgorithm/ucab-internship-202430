import { Component } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { UserCurrentRoleService } from '~/features/profile/user-current-role.service'
import { CreateTravelStoreService } from '~/features/travels/create-travel-store.service'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-travel-type-selection',
	standalone: true,
	imports: [PageLayoutComponent, RouterLink],
	templateUrl: './travel-type-selection.component.html',
	styleUrl: './travel-type-selection.component.css'
})
export class TravelTypeSelectionComponent {
	ucabToExternalRouteToRedirect = '/app/offer-travel'
	externalToUcabRouteToRedirect = '/app/view-travels'

	constructor(
		private readonly userCurrentRoleService: UserCurrentRoleService,
		private readonly createTravelStoreService: CreateTravelStoreService,
		private readonly router: Router
	) {
		this.userCurrentRoleService.currentRole$.subscribe((role) => {
			if (role === 'passenger') {
				this.ucabToExternalRouteToRedirect = '/app/select-destination'
				this.externalToUcabRouteToRedirect = '/app/available-drivers'
			} else {
				this.ucabToExternalRouteToRedirect = '/app/offer-travel'
				this.externalToUcabRouteToRedirect = '/app/offer-travel'
			}
		})
	}

	handleToUcabSelection() {
		this.createTravelStoreService.type = 'to-ucab'
		this.router.navigate([this.ucabToExternalRouteToRedirect], {
			queryParams: { type: 'to-ucab' }
		})
	}

	handleFromUcabSelection() {
		this.createTravelStoreService.type = 'from-ucab'
		this.router.navigate([this.externalToUcabRouteToRedirect], {
			queryParams: { type: 'from-ucab' }
		})
	}
}
