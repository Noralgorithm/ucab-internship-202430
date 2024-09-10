import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { UserCurrentRoleService } from '~/features/profile/services/user-current-role.service'
import { DriverTabBarComponent } from '../driver-tab-bar/tab-bar.component'
import { PassengerTabBarComponent } from '../passenger-tab-bar/tab-bar.component'

@Component({
	selector: 'tab-bar-layout',
	standalone: true,
	imports: [PassengerTabBarComponent, DriverTabBarComponent, RouterOutlet],
	templateUrl: './tab-bar-layout.component.html',
	styleUrl: './tab-bar-layout.component.css'
})
export class TabBarLayoutComponent {
	constructor(private userCurrentRoleService: UserCurrentRoleService) {}

	isPassenger = true

	ngOnInit() {
		this.userCurrentRoleService.currentRole$.subscribe((role) => {
			this.isPassenger = role === 'passenger'
		})
	}
}
