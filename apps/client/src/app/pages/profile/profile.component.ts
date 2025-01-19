import { Component } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { GetOwnDestinationsService } from '~/features/my-destinations/api/get-own-destinations.service'
import { GetOwnProfileService } from '~/features/profile/api/get-own-profile.service'
import { UserCurrentRoleService } from '~/features/profile/user-current-role.service'
import { TOKEN_KEY } from '~/shared/constants'
import { Destination } from '~/shared/types/maps/destination'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { USER_ROLE_LABELS } from '~/shared/utils/user-role-labels.util'
import { USER_TYPE_LABELS } from '~/shared/utils/user-type-labels.util'
import { StarRatingComponent } from '../../shared/ui/components/star-rating/star-rating.component'

@Component({
	selector: 'app-profile',
	standalone: true,
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
	imports: [
		PageLayoutComponent,
		ButtonComponent,
		RouterLink,
		StarRatingComponent
	]
})
export class ProfileComponent {
	constructor(
		private readonly getOwnProfileService: GetOwnProfileService,
		public readonly userCurrentRoleService: UserCurrentRoleService,
		private router: Router,
		private readonly toastrService: ToastrService,
		private readonly getOwnDestinationsService: GetOwnDestinationsService
	) {}

	userTypeLabels = USER_TYPE_LABELS
	userRoleLabels = USER_ROLE_LABELS

	profile: UserProfile | undefined
	destinations: Destination[] = []

	ngOnInit() {
		this.getOwnProfileService.execute().subscribe({
			next: (res) => {
				this.profile = res.data
			},
			error: (err) => {
				this.toastrService.error('Error obteniendo el perfil')
			}
		})

		this.getOwnDestinationsService.execute().subscribe({
			next: (res) => {
				this.destinations = res.data
			},
			error: (err) => {
				this.toastrService.error('Error obteniendo mis destinos')
			}
		})
	}

	redirectToMyDestinations() {
		this.router.navigate(['/app/my-destinations'])
	}

	logout() {
		localStorage.removeItem(TOKEN_KEY)
		localStorage.removeItem('user')
		this.toastrService.success('Se ha cerrado la sesión correctamente')
		this.router.navigate([''])
	}
}
