import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { SelectOption } from '~/shared/types/select-option.type'

@Component({
	selector: 'dropdown',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
	@Input() options: SelectOption[] = []
	@Input({ required: true }) inputId!: string
	@Input() label = ''
	@Input() control: FormControl = new FormControl()
}
