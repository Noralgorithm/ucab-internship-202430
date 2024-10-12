import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RidesService } from '../rides/rides.service'
import { User } from '../users/entities/user.entity'
import { CreateMessageAsDriverDto } from './dto/create-message-as-driver.dto'
import { CreateMessageAsPassengerDto } from './dto/create-message-as-passenger.dto'
import { Message } from './entities/message.entity'

@Injectable()
export class MessagesService {
	constructor(
		@InjectRepository(Message)
		private readonly messagesRepository: Repository<Message>,
		private readonly ridesService: RidesService
	) {}

	async createAsDriver(createMessageDto: CreateMessageAsDriverDto) {}

	async createAsPassenger(
		createMessageDto: CreateMessageAsPassengerDto,
		currentUser: User
	) {
		const ride = await this.ridesService.findOne({
			where: { id: createMessageDto.rideId }
		})

		console.log('Driver')
		console.log(ride.travel.vehicle.driver)

		// const message = this.messagesRepository.create({
		// 	...createMessageDto,
		// 	ride,
		// 	passenger: currentUser
		// })
	}

	async findOne(id: number) {
		return `This action returns a #${id} message`
	}
}
