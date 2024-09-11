import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { SignInService } from '~/features/auth/services/sign-in.service'
import { UserCurrentRoleService } from '~/features/profile/services/user-current-role.service'
import { PREFERRED_ROLE_KEY } from '~/shared/constants'
import { UserRole } from '~/shared/types/users/user-role.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { LogoComponent } from '~/shared/ui/components/logo/logo.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { PasswordInputComponent } from '~/shared/ui/components/password-input/password-input.component'
import { TextInputComponent } from '~/shared/ui/components/text-input/text-input.component'

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
	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly signInService: SignInService,
		private readonly userCurrentRole: UserCurrentRoleService
	) {}

	userPreferredRole: UserRole = 'passenger'
	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			const email = params['e']

			if (email) {
				this.loginFormGroup.controls.email.setValue(email)
			}
		})
	}

	loginFormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8)
		])
	})

	setUserCurrentRole() {
		this.userCurrentRole.setCurrentRole(this.userPreferredRole)
	}

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
			.subscribe({
				next: (res) => {
					this.userPreferredRole =
						(localStorage.getItem(PREFERRED_ROLE_KEY) as UserRole) ??
						'passenger'
					this.setUserCurrentRole()
					alert('Logged in successfully')
					this.router.navigate(['/app/profile'])
				},
				error: (err) => {
					alert('Failed to log in')
				}
			})
	}
}
