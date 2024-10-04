import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { UserCurrentRoleService } from '~/features/profile/user-current-role.service'
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

	constructor(private readonly userCurrentRoleService: UserCurrentRoleService) {
		this.userCurrentRoleService.currentRole$.subscribe((role) => {
			if (role === 'passenger') {
				this.ucabToExternalRouteToRedirect = '/app/select-destination'
				this.externalToUcabRouteToRedirect = '/app/available-drivers'
			} else {
				this.ucabToExternalRouteToRedirect = '/app/route-selection'
				this.externalToUcabRouteToRedirect = '/app/route-selection'
			}
		})
	}
}
