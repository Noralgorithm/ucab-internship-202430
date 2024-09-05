import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { RequestSignUpService } from '../../../features/auth/services/request-sign-up.service'
import { ButtonComponent } from '../../../shared/ui/components/button/button.component'
import { LogoComponent } from '../../../shared/ui/components/logo/logo.component'
import { PageLayoutComponent } from '../../../shared/ui/components/page-layout/page-layout.component'
import { TextInputComponent } from '../../../shared/ui/components/text-input/text-input.component'

@Component({
	selector: 'app-email-verification',
	standalone: true,
	imports: [
		LogoComponent,
		LogoComponent,
		TextInputComponent,
		ButtonComponent,
		PageLayoutComponent
	],
	templateUrl: './email-verification.component.html'
})
export class EmailVerificationComponent {
	constructor(
		private readonly requestSignUpService: RequestSignUpService,
		private readonly router: Router
	) {}

	emailControl = new FormControl('', [Validators.email])

	handleSubmit() {
		if (this.emailControl.invalid || !this.emailControl.value) {
			throw new Error('Invalid email submission')
		}

		this.requestSignUpService
			.execute(this.emailControl.value)
			.subscribe((res) => {
				if (res.ok) {
					this.router.navigate(['/email-verification/success'])
				} else {
					//TODO: show error to user
				}
			})
	}
}
