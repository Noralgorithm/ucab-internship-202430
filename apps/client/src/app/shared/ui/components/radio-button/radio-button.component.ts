import { Component } from '@angular/core'
import { Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
@Component({
	selector: 'radio-button',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './radio-button.component.html',
	styleUrl: './radio-button.component.css'
})
export class RadioButtonComponent {
	@Input({ required: true }) inputId!: string
	@Input() control: FormControl = new FormControl()
	@Input() value = ''
	@Input() label = ''
}
