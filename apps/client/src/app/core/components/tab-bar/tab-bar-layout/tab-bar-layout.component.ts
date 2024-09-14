import { animate, style, transition, trigger } from '@angular/animations'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { UserCurrentRoleService } from '~/features/profile/api/user-current-role.service'
import { DriverTabBarComponent } from '../driver-tab-bar/tab-bar.component'
import { PassengerTabBarComponent } from '../passenger-tab-bar/tab-bar.component'

@Component({
	selector: 'tab-bar-layout',
	standalone: true,
	imports: [PassengerTabBarComponent, DriverTabBarComponent, RouterOutlet],
	templateUrl: './tab-bar-layout.component.html',
	styleUrl: './tab-bar-layout.component.css',
	animations: [
		trigger('InOut', [
			transition(':enter', [
				style({ transform: 'translateY(130%)' }),
				animate('0.2s 0.2s')
			]),
			transition(':leave', [
				animate('0.2s', style({ transform: 'translateY(130%)' }))
			])
		])
	]
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
