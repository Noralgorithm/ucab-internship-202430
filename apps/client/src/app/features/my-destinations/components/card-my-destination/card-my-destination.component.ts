import { Component } from '@angular/core'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'

@Component({
	selector: 'card-my-destination',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './card-my-destination.component.html',
	styleUrl: './card-my-destination.component.css'
})
export class CardMyDestinationComponent {}
