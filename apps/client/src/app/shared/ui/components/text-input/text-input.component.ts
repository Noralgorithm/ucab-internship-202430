import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
	selector: 'text-input',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './text-input.component.html',
	styleUrl: './text-input.component.css'
})
export class InputTextComponent {
	@Input({ required: true }) inputId!: string
	@Input() control: FormControl = new FormControl()
	@Input() disabled = false
	@Input() placeholder = ''
	@Input() label = ''
}
