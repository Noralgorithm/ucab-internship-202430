import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import {
	SignUpService,
	SignUpServiceDto
} from '../../../features/auth/services/sign-up.service'
import { UserType } from '../../../shared/types/users/user-type.type'
import { ButtonComponent } from '../../../shared/ui/components/button/button.component'
import { LogoComponent } from '../../../shared/ui/components/logo/logo.component'
import { PasswordInputComponent } from '../../../shared/ui/components/password-input/password-input.component'
import { TextInputComponent } from '../../../shared/ui/components/text-input/text-input.component'
import { passwordsMatchValidator } from '../../../shared/utils/passwords-match.validator'

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		TextInputComponent,
		ButtonComponent,
		PasswordInputComponent,
		LogoComponent,
		ReactiveFormsModule
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {
	constructor(
		private readonly route: ActivatedRoute,
		private readonly signUpService: SignUpService
	) {}

	private signUpToken: string | null = null

	email = 'mpforero.21@est.ucab.edu.ve'

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.signUpToken = params['t']
		})
	}

	registerFormGroup = new FormGroup(
		{
			profilePic: new FormControl<File | undefined>(undefined, [
				Validators.required
			]),
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', [Validators.required]),
			email: new FormControl({ value: this.email, disabled: true }, [
				Validators.required
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			]),
			confirmPassword: new FormControl('', [Validators.required]),
			gender: new FormControl('', [Validators.required]),
			type: new FormControl<UserType>({ value: 'student', disabled: true })
		},
		{ validators: passwordsMatchValidator }
	)

	handleSubmit() {
		this.signUpService.execute(this.constructSignUpDto()).subscribe((res) => {
			console.log(res)
		})
	}

	onImageUpload(event: Event) {
		if (!event.target) return

		const file = (event.target as HTMLInputElement).files?.[0]

		this.registerFormGroup.patchValue({ profilePic: file })
	}

	private constructSignUpDto(): SignUpServiceDto {
		return {
			...this.registerFormGroup.value,
			type: this.registerFormGroup.controls.type.value,
			signUpRequestId: this.signUpToken
		} as SignUpServiceDto
	}
}
