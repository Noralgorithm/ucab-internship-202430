import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { interval, mergeMap } from 'rxjs'
import { RetrieveRideMessagesService } from '~/features/chat/api/retrieve-ride-messages.service'
import { SendRideMessageService } from '~/features/chat/api/send-ride-message.service'
import { ID_KEY } from '~/shared/constants'
import { Message, RideMessages } from '~/shared/types/rides/ride-request.type'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

const REFETCH_WAIT_TIME_IN_MS = 1000

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [PageLayoutComponent, FormsModule, RouterLink],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	currentUserId = localStorage.getItem(ID_KEY)
	rideId = ''
	rideMessages: RideMessages | null = null
	groupedMessages: GroupedMessages[] = []
	newMessage = ''

	constructor(
		private readonly retrieveRideMessagesService: RetrieveRideMessagesService,
		private readonly sendRideMessageService: SendRideMessageService,
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) {
		this.route.queryParams.subscribe((params) => {
			this.rideId = params['rideId']
		})
	}

	ngOnInit() {
		interval(REFETCH_WAIT_TIME_IN_MS)
			.pipe(
				mergeMap(() => this.retrieveRideMessagesService.execute(this.rideId))
			)
			.subscribe({
				next: (res) => {
					this.rideMessages = res.data
					this.groupedMessages = this.groupMessagesByDate()
				}
			})
	}

	sendMessage() {
		if (!this.newMessage || this.newMessage.trim() === '') {
			return
		}

		this.sendRideMessageService
			.execute(this.rideId, this.newMessage)
			.subscribe(() => {})

		this.newMessage = ''
	}

	formatDate(date: string) {
		return new Date(date).toLocaleString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		})
	}

	groupMessagesByDate(): GroupedMessages[] {
		if (!this.rideMessages) {
			return []
		}

		const groupedMessages = this.rideMessages.messages.reduce(
			(acc, message) => {
				const date = new Date(message.createdAt).toLocaleDateString()
				const messages = acc.get(date) || []
				messages.push(message)
				acc.set(date, messages)
				return acc
			},
			new Map<string, RideMessages['messages']>()
		)

		return Array.from(groupedMessages.entries()).map(([date, messages]) => ({
			date,
			messages
		}))
	}

	whoami(compareId: string) {
		return this.currentUserId === compareId
	}
	redirectPassenger() {
		this.router.navigate(['app/travel-waiting-room'], {
			queryParams: { id: this.rideId },
			queryParamsHandling: 'preserve'
		})
	}
	redirectDriver() {
		this.router.navigate(['app/travel-lobby'], {
			queryParams: { id: this.rideId },
			queryParamsHandling: 'preserve'
		})
	}
}

interface GroupedMessages {
	date: string
	messages: Message[]
}
