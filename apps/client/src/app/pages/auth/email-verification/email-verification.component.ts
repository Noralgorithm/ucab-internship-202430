import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { RequestSignUpService } from '../../../features/auth/services/request-sign-up.service'
import { ButtonComponent } from '../../../shared/ui/components/button/button.component'
import { LogoComponent } from '../../../shared/ui/components/logo/logo.component'
import { InputTextComponent } from '../../../shared/ui/components/text-input/text-input.component'

@Component({
	selector: 'app-email-verification',
	standalone: true,
	imports: [LogoComponent, LogoComponent, InputTextComponent, ButtonComponent],
	templateUrl: './email-verification.component.html',
	styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {
	constructor(private readonly requestSignUpService: RequestSignUpService) {}

	emailControl = new FormControl('', [Validators.email])

	handleSubmit() {
		if (this.emailControl.invalid || !this.emailControl.value) {
			throw new Error('Invalid email submission')
		}

		this.requestSignUpService
			.execute(this.emailControl.value)
			.subscribe((res) => {
				console.log(res)
			})
	}
}
