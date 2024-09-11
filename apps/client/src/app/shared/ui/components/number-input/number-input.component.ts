import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ValidationErrorMessages } from '~/shared/types/validation-error-messages.type'
import { DEFAULT_ERROR_MESSAGES } from '~/shared/utils/default-error-messages.util'

@Component({
	selector: 'number-input',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './number-input.component.html',
	styleUrl: './number-input.component.css'
})
export class NumberInputComponent {
	@Input({ required: true }) inputId!: string
	@Input() control: FormControl = new FormControl()
	@Input() min = 0
	@Input() max = 0
	@Input() errorMessages: ValidationErrorMessages = DEFAULT_ERROR_MESSAGES
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
