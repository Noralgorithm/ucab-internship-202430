import { Component, ElementRef, ViewChild } from '@angular/core'
import { Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
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
	@Input() errorMessages: ValidationErrorMessages = {
		...DEFAULT_ERROR_MESSAGES,
		notMatchingPassword: 'Las contraseñas no coinciden'
	}
	@Input() placeholder = ''
	@Input() label = ''

	@ViewChild('input') input: ElementRef<HTMLInputElement> | undefined

	showPassword = false

	get isInvalid() {
		return this.control.errors && this.control.dirty && this.control.touched
	}

	getErrorMessage() {
		const errors = this.control.errors
		if (!errors) return ''

		const key = Object.keys(errors)[0]
		return this.errorMessages[key]
	}

	handlePasswordVisibility() {
		if (this.showPassword) {
			this.showPassword = false
			this.input?.nativeElement.focus()
		} else {
			this.showPassword = true
			this.input?.nativeElement.focus()
		}
	}
}
