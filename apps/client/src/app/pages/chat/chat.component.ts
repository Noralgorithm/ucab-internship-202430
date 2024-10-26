import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { interval, mergeMap } from 'rxjs'
import { RetrieveRideMessagesService } from '~/features/chat/api/retrieve-ride-messages.service'
import { SendRideMessageService } from '~/features/chat/api/send-ride-message.service'
import { RideMessages } from '~/shared/types/rides/ride-request.type'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [PageLayoutComponent, FormsModule],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	rideMessages: RideMessages | null = null
	newMessage = ''
	REFETCH_WAIT_TIME_IN_MS = 2000
	rideId: string | null = null

	constructor(
		private readonly retrieveRideMessagesService: RetrieveRideMessagesService,
		private readonly sendRideMessageService: SendRideMessageService,
		private readonly route: ActivatedRoute
	) {
		this.route.queryParams.subscribe((params) => {
			this.rideId = params['id'] as string
		})
	}

	ngOnInit() {
		interval(this.REFETCH_WAIT_TIME_IN_MS)
			.pipe(
				mergeMap(() => {
					if (this.rideId) {
						return this.retrieveRideMessagesService.execute(this.rideId)
					}
					return []
				})
			)
			.subscribe({
				next: (res) => {
					this.rideMessages = res.data
				}
			})

		this.getRideMessages()
	}

	getRideMessages() {
		this.retrieveRideMessagesService
			.execute('8db5020e-4cd2-46eb-b7f2-70f5d320248c')
			.subscribe((res) => {
				this.rideMessages = res.data
			})
	}

	sendMessage() {
		if (!this.newMessage || this.newMessage.trim() === '') {
			return
		}

		this.sendRideMessageService
			.execute('8db5020e-4cd2-46eb-b7f2-70f5d320248c', this.newMessage)
			.subscribe(() => {})
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
