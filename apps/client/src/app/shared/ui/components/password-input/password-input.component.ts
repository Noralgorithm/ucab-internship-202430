import { Component } from '@angular/core'
import { Input } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidationErrorMessages } from '../../../types/validation-error-messages.type'
import { DEFAULT_ERROR_MESSAGES } from '../../../utils/default-error-messages.util'

@Component({
	selector: 'password-input',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './password-input.component.html',
	styleUrl: './password-input.component.css'
})
export class PasswordInputComponent {
	@Input({ required: true }) inputId!: string
	@Input({ required: true }) control: FormControl = new FormControl()
	/*TODO: Why is this an input decorator?*/
	@Input() errorMessages: ValidationErrorMessages = DEFAULT_ERROR_MESSAGES
	@Input() placeholder = ''
	@Input() label = ''
	showPassword = false

	get isInvalid() {
		return this.control.errors && this.control.dirty && this.control.touched
	}

	getErrorMessage() {
		const errors = this.control.errors
		if (!errors) return ''

		const key = Object.keys(errors)[0]
		return this.errorMessages[key as keyof typeof Validators]
	}

	handlePasswordVisibility() {
		if (this.showPassword) {
			this.showPassword = false
		} else {
			this.showPassword = true
		}
	}
}
