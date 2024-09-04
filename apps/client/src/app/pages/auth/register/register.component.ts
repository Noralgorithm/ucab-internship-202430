import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ButtonComponent } from '../../../shared/ui/components/button/button.component'
import { LogoComponent } from '../../../shared/ui/components/logo/logo.component'
import { PasswordInputComponent } from '../../../shared/ui/components/password-input/password-input.component'
import { TextInputComponent } from '../../../shared/ui/components/text-input/text-input.component'

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		TextInputComponent,
		ButtonComponent,
		PasswordInputComponent,
		LogoComponent
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {
	registerForm = new FormGroup({
		profilePhoto: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		email: new FormControl({
			value: 'mpforero.21@est.ucab.edu.ve',
			disabled: true
		}),
		password: new FormControl('', [Validators.required]),
		confirmPassword: new FormControl('', [Validators.required]),
		genderChoice: new FormControl('', [Validators.required]),
		type: new FormControl({ value: 'Estudiante', disabled: true })
	})

	handleSubmit() {
		console.log(this.registerForm.controls)
	}
}
