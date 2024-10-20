import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Destination } from '~/shared/types/maps/destination'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'

@Component({
	selector: 'card-my-destination',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './card-my-destination.component.html',
	styleUrl: './card-my-destination.component.css'
})
export class CardMyDestinationComponent {
	@Input({ required: true }) destination!: Destination
	@Input({ required: true }) actionButtons = true

	@Output() onDelete = new EventEmitter<void>()
}
