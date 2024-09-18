import { Component } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { GetOwnProfileService } from '~/features/profile/api/get-own-profile.service'
import { UserCurrentRoleService } from '~/features/profile/user-current-role.service'
import { TOKEN_KEY } from '~/shared/constants'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { USER_ROLE_LABELS } from '~/shared/utils/user-role-labels.util'
import { USER_TYPE_LABELS } from '~/shared/utils/user-type-labels.util'

@Component({
	selector: 'app-profile',
	standalone: true,
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
	imports: [PageLayoutComponent, ButtonComponent, RouterLink]
})
export class ProfileComponent {
	constructor(
		private readonly getOwnProfileService: GetOwnProfileService,
		public readonly userCurrentRoleService: UserCurrentRoleService,
		private router: Router
	) {}

	userTypeLabels = USER_TYPE_LABELS
	userRoleLabels = USER_ROLE_LABELS

	profile: UserProfile | undefined

	ngOnInit() {
		this.getOwnProfileService.execute().subscribe((res) => {
			this.profile = res.data
		})
	}

	logout() {
		localStorage.removeItem(TOKEN_KEY)
		localStorage.removeItem('user')
		//TODO: ADD Toast
		// this.toast.show('success', 'Éxito', 'Usted ha cerrado sesión correctamente')
		this.router.navigate([''])
	}
}
