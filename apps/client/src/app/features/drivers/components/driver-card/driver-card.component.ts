import { Component, Input } from '@angular/core'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { getFirstLastName } from '~/shared/utils/get-first-last-name'
import { getFirstName } from '~/shared/utils/get-first-name'

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

	showFirstName(fullName: string) {
		return getFirstName(fullName)
	}

	showFirstLastName(fullLastName: string) {
		return getFirstLastName(fullLastName)
	}
}
