import { Component } from '@angular/core'
import { UserCurrentRoleService } from '~/features/profile/user-current-role.service'
import { ModalComponent } from '~/shared/ui/components/modal/modal.component'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [PageLayoutComponent, ModalComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {
	constructor(
		private readonly userCurrentRoleService: UserCurrentRoleService
	) {}
	//TODO: make component not execute animations on first load when user is already setted as driver

	isUserRoleToggleChecked = false
	emergencyNumber = '12345678'
	emergencyLink = `sms://${this.emergencyNumber}?&body=AYUDAAAA ME SECUESTRAN`

	ngOnInit() {
		this.userCurrentRoleService.currentRole$.subscribe((role) => {
			this.isUserRoleToggleChecked = role === 'driver'
		})
	}

	handleUserRoleToggle(event: Event) {
		const isChecked = (event.target as HTMLInputElement).checked

		if (isChecked) {
			this.userCurrentRoleService.setCurrentRole('driver')
		} else {
			this.userCurrentRoleService.setCurrentRole('passenger')
		}
	}
}
