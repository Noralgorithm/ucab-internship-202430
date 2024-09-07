import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { RetrieveSignUpRequestService } from '../../../features/auth/services/retrieve-sign-up-request.service'
import {
	SignUpService,
	SignUpServiceDto
} from '../../../features/auth/services/sign-up.service'
import { UserType } from '../../../shared/types/users/user-type.type'
import { ButtonComponent } from '../../../shared/ui/components/button/button.component'
import { LogoComponent } from '../../../shared/ui/components/logo/logo.component'
import { PageLayoutComponent } from '../../../shared/ui/components/page-layout/page-layout.component'
import { PasswordInputComponent } from '../../../shared/ui/components/password-input/password-input.component'
import { RadioButtonComponent } from '../../../shared/ui/components/radio-button/radio-button.component'
import { TextInputComponent } from '../../../shared/ui/components/text-input/text-input.component'
import { isUcabStudentEmail } from '../../../shared/utils/is-ucab-student.util'
import { passwordsMatchValidator } from '../../../shared/utils/passwords-match.validator'

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		TextInputComponent,
		ButtonComponent,
		PasswordInputComponent,
		LogoComponent,
		RadioButtonComponent,
		ReactiveFormsModule,
		PageLayoutComponent
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {
	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly signUpService: SignUpService,
		private readonly retrieveSignUpRequestService: RetrieveSignUpRequestService
	) {}
	private readonly STUDENT_INPUT_VALUE = 'Estudiante'

	private signUpToken: string | null = null

	isStudent = false

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.signUpToken = params['t']

			// TODO: Create page for the redirect "No se encuentra la página"

			if (!this.signUpToken) {
				this.router.navigate([''])
				return
			}

			this.retrieveSignUpRequestService
				.execute(this.signUpToken)
				.subscribe((res) => {
					if (res.ok) {
						this.registerFormGroup.controls.email.setValue(res.val.email)

						if (isUcabStudentEmail(res.val.email)) {
							this.isStudent = true
							this.useStudentTypeControl()
						}
					}
				})
		})
	}

	registerFormGroup = new FormGroup(
		{
			profilePic: new FormControl<File | undefined>(undefined, [
				Validators.required
			]),
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', [Validators.required]),
			email: new FormControl<string>({ value: '', disabled: true }, [
				Validators.required
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8)
			]),
			confirmPassword: new FormControl('', [Validators.required]),
			gender: new FormControl('', [Validators.required]),
			type: new FormControl<UserType | 'Estudiante'>('staff', [
				Validators.required
			])
		},
		{ validators: passwordsMatchValidator }
	)

	handleSubmit() {
		this.signUpService.execute(this.constructSignUpDto()).subscribe((res) => {
			if (res.ok) {
				this.router.navigate(['/auth/sign-in'], {
					queryParams: { e: this.registerFormGroup.controls.email.value }
				})
			}
			//TODO: show error to user
		})
	}

	onImageUpload(event: Event) {
		if (!event.target) return

		const file = (event.target as HTMLInputElement).files?.[0]

		this.registerFormGroup.patchValue({ profilePic: file })
	}

	useStudentTypeControl() {
		this.registerFormGroup.controls.type.setValue(this.STUDENT_INPUT_VALUE)
		this.registerFormGroup.controls.type.disable()
	}

	private constructSignUpDto(): SignUpServiceDto {
		const typeToUse =
			this.registerFormGroup.controls.type.value === this.STUDENT_INPUT_VALUE
				? 'student'
				: this.registerFormGroup.controls.type.value

		return {
			...this.registerFormGroup.value,
			type: typeToUse,
			signUpRequestId: this.signUpToken
		} as SignUpServiceDto
	}
}
