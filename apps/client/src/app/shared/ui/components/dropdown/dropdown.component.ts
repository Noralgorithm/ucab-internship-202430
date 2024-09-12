import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
	selector: 'dropdown',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
	@Input() options: Option[] = []
	@Input({ required: true }) inputId!: string
	@Input() label = ''
	@Input() control: FormControl = new FormControl()
}

interface Option {
	value: string
	label: string
}
