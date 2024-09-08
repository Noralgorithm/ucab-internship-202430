import { Component } from '@angular/core'
import { GetOwnProfileService } from '~/features/profile/services/get-own-profile.service'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-profile',
	standalone: true,
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css',
	imports: [PageLayoutComponent, ButtonComponent]
})
export class ProfileComponent {
	constructor(private readonly getOwnProfileService: GetOwnProfileService) {}

	profile: UserProfile | undefined

	ngOnInit() {
		this.getOwnProfileService.execute().subscribe((res) => {
			this.profile = res.data
		})
	}
}
