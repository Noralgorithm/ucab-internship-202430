import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
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
	emailControl = new FormControl({ value: '', disabled: true }, [
		Validators.email,
		Validators.minLength(5)
	])
}
