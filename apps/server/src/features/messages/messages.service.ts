import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RidesService } from '~/features/rides/rides.service'
import { User } from '~/features/users/entities/user.entity'
import { CreateMessageDto } from './dto/create-message.dto'
import { FindRideMessagesDto } from './dto/find-ride-messages.dto'
import { Message } from './entities/message.entity'

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(Message)
		private readonly messagesRepository: Repository<Message>,
		private readonly ridesService: RidesService
	) {}

	async create(createMessageDto: CreateMessageDto, currentUser: User) {
		const ride = await this.ridesService.findOne({
			where: { id: createMessageDto.rideId }
		})

		const message = this.messagesRepository.create({
			...createMessageDto,
			ride,
			sender: currentUser
		})

		return await this.messagesRepository.save(message)
	}

	async findAllRideMessages(findRideMessagesDto: FindRideMessagesDto) {
		return await this.messagesRepository.find({
			where: { ride: { id: findRideMessagesDto.rideId } },
			order: { createdAt: 'ASC' }
		})
	}
}
