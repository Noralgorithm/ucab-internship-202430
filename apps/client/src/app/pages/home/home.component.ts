import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { UserCurrentRoleService } from '~/features/profile/user-current-role.service'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'
import { RadioButtonComponent } from '../../shared/ui/components/radio-button/radio-button.component'
@Component({
	selector: 'app-home',
	standalone: true,
	imports: [PageLayoutComponent, RadioButtonComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {
	constructor(
		private readonly userCurrentRoleService: UserCurrentRoleService
	) {}

	roleControl = new FormControl('')

	ngOnInit() {
		this.userCurrentRoleService.currentRole$.subscribe((role) => {
			if (this.roleControl.value !== role) this.roleControl.setValue(role)
		})

		this.roleControl.valueChanges.subscribe((role) => {
			this.userCurrentRoleService.setCurrentRole(role as 'driver' | 'passenger')
		})
	}
}
