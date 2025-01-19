import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription, interval, mergeMap } from 'rxjs'
import { RetrieveRideMessagesService } from '~/features/chat/api/retrieve-ride-messages.service'
import { SendRideMessageService } from '~/features/chat/api/send-ride-message.service'
import { ID_KEY } from '~/shared/constants'
import { Message, RideMessages } from '~/shared/types/rides/ride-request.type'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'
import { defaultMessages } from './chat-default-messages'

const REFETCH_WAIT_TIME_IN_MS = 1000

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [PageLayoutComponent, FormsModule],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
	currentUserId = localStorage.getItem(ID_KEY)
	rideId = ''
	rideMessages: RideMessages | null = null
	groupedMessages: GroupedMessages[] = []
	newMessage = ''
	isSelectOpen = false
	selectOptions: string[] = []

	chatSubscription: Subscription | null = null

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
		this.chatSubscription = interval(REFETCH_WAIT_TIME_IN_MS)
			.pipe(
				mergeMap(() => this.retrieveRideMessagesService.execute(this.rideId))
			)
			.subscribe({
				next: (res) => {
					this.rideMessages = res.data
					this.groupedMessages = this.groupMessagesByDate()
					if (this.rideMessages.travelType === 'to-ucab') {
						if (this.rideMessages.driver.phoneNumber) {
							defaultMessages[this.rideMessages.travelType].driver.push(
								`Mi número de teléfono es: ${this.rideMessages.driver.phoneNumber}`
							)
						}
						if (this.rideMessages.passenger.phoneNumber !== null) {
							defaultMessages[this.rideMessages.travelType].passenger.push(
								`Mi número de teléfono es: ${this.rideMessages.passenger.phoneNumber}`
							)
						}
					}
					if (this.whoami(this.rideMessages.driver.id)) {
						this.selectOptions =
							defaultMessages[this.rideMessages.travelType].driver
					} else {
						this.selectOptions =
							defaultMessages[this.rideMessages.travelType].passenger
					}
				}
			})
	}

	ngOnDestroy() {
		this.chatSubscription?.unsubscribe()
	}

	sendMessage(message: string) {
		this.sendRideMessageService
			.execute(this.rideId, message)
			.subscribe(() => {})

		this.toggleSelect()
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

	toggleSelect() {
		this.isSelectOpen = !this.isSelectOpen
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
