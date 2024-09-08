import { Component } from '@angular/core'
import { GetOwnProfileService } from '~/features/profile/services/get-own-profile.service'

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.css'
})
export class ProfileComponent {
	constructor(private readonly getOwnProfileService: GetOwnProfileService) {}

	ngOnInit() {
		this.getOwnProfileService.execute().subscribe((profile) => {
			console.log(profile)
		})
	}
}
