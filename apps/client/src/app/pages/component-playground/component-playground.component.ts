import { Component } from '@angular/core'
import { ButtonComponent } from '../../shared/components/button/button.component'

@Component({
	selector: 'app-component-playground',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './component-playground.component.html',
	styleUrl: './component-playground.component.css'
})
export class ComponentPlaygroundComponent {}
