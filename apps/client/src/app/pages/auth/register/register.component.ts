import { Component } from '@angular/core'
import { InputTextComponent } from '../../../shared/ui/components/inputText/inputText.component'

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [InputTextComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {}
