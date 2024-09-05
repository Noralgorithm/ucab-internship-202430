import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { SignInService } from '../../../features/auth/services/sign-in.service'
import { ButtonComponent } from '../../../shared/ui/components/button/button.component'
import { LogoComponent } from '../../../shared/ui/components/logo/logo.component'
import { PageLayoutComponent } from '../../../shared/ui/components/page-layout/page-layout.component'
import { PasswordInputComponent } from '../../../shared/ui/components/password-input/password-input.component'
import { TextInputComponent } from '../../../shared/ui/components/text-input/text-input.component'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		LogoComponent,
		PageLayoutComponent,
		PasswordInputComponent,
		TextInputComponent,
		ButtonComponent,
		ReactiveFormsModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	constructor(private readonly signInService: SignInService) {}

	loginFormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8)
		])
	})

	handleSubmit() {
		if (
			!this.loginFormGroup.value.email ||
			!this.loginFormGroup.value.password
		) {
			throw new Error('Email and password are required')
		}

		this.signInService
			.execute(
				this.loginFormGroup.value.email,
				this.loginFormGroup.value.password
			)
			.subscribe((res) => {
				if (res.ok) {
					alert('Logged in successfully')
				} else {
					// TODO: show error to user
					alert('Failed to log in')
				}
			})
	}
}
