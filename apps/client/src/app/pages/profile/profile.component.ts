import { JsonPipe } from '@angular/common'
import { Component } from '@angular/core'
import { GetOwnProfileService } from '~/features/profile/services/get-own-profile.service'
import { UserProfile } from '~/shared/types/users/user-profile.type'

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [JsonPipe],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css'
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
