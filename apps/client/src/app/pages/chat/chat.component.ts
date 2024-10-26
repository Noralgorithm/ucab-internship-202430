import { Component, OnInit } from '@angular/core'
import { RetrieveRideMessagesService } from '~/features/chat/api/retrieve-ride-messages.service'
import { RideMessages } from '~/shared/types/rides/ride-request.type'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [PageLayoutComponent],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	rideMessages: RideMessages | null = null

	constructor(
		private readonly retrieveRideMessagesService: RetrieveRideMessagesService
	) {}

	ngOnInit() {
		this.getRideMessages()
	}

	getRideMessages() {
		this.retrieveRideMessagesService
			.execute('bc13c275-95b8-4522-bcfc-c84669332d01')
			.subscribe((res) => {
				this.rideMessages = res.data
			})
	}

	formatDate(date: string) {
		const inputDate = new Date(date)
		const today = new Date()

		const isToday = inputDate.toDateString() === today.toDateString()

		if (isToday) {
			return inputDate.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true
			})
		}
		return inputDate.toLocaleString([], {
			day: '2-digit',
			month: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		})
	}
}
