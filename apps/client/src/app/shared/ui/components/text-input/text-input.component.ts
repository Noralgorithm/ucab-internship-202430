import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidationErrorMessages } from '../../../types/validation-error-messages.type'
import { DEFAULT_ERROR_MESSAGES } from '../../../utils/default-error-messages.util'

@Component({
	selector: 'text-input',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './text-input.component.html',
	styleUrl: './text-input.component.css'
})
export class TextInputComponent {
	@Input({ required: true }) inputId!: string
	@Input() control: FormControl = new FormControl()
	@Input() errorMessages: ValidationErrorMessages = DEFAULT_ERROR_MESSAGES
	@Input() type: 'text' | 'email' = 'text'
	@Input() placeholder = ''
	@Input() label = ''

	get isInvalid() {
		return this.control.errors && this.control.dirty && this.control.touched
	}

	getErrorMessage() {
		const errors = this.control.errors
		if (!errors) return ''

		const key = Object.keys(errors)[0]
		return this.errorMessages[key as keyof typeof Validators]
	}
}
