import { Component, Input } from '@angular/core'
import { UserProfile } from '~/shared/types/users/user-profile.type'

@Component({
	selector: 'driver-card',
	standalone: true,
	imports: [],
	templateUrl: './driver-card.component.html',
	styleUrl: './driver-card.component.css'
})
export class DriverCardComponent {
	@Input({ required: true }) driver!: UserProfile & {
		passengerAmount: number
		passengerCapacity: number
	}
}
