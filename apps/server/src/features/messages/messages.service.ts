import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RidesService } from '~/features/rides/rides.service'
import { User } from '~/features/users/entities/user.entity'
import { Ride } from '../rides/entities/ride.entity'
import { CreateMessageDto } from './dto/create-message.dto'
import { Message } from './entities/message.entity'

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(Message)
		private readonly messagesRepository: Repository<Message>,
		private readonly ridesService: RidesService
	) {}

	async create(
		rideId: Ride['id'],
		createMessageDto: CreateMessageDto,
		currentUser: User
	) {
		const ride = await this.ridesService.findOne({
			where: { id: rideId }
		})

		const message = this.messagesRepository.create({
			...createMessageDto,
			ride,
			sender: currentUser
		})

		return await this.messagesRepository.save(message)
	}

	async findAllRideMessages(rideId: Ride['id']) {
		return await this.messagesRepository.find({
			where: { ride: { id: rideId } },
			order: { createdAt: 'ASC' }
		})
	}
}
