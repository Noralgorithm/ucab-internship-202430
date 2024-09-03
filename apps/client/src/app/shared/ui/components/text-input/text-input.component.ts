import { Component, Input } from '@angular/core'

@Component({
	selector: 'text-input',
	standalone: true,
	imports: [],
	templateUrl: './text-input.component.html',
	styleUrl: './text-input.component.css'
})
export class InputTextComponent {
	@Input() disabled = false
}
