import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '~/features/auth/decorators/current-user.decorator'
import { User } from '~/features/users/entities/user.entity'
import { CreateMessageDto } from './dto/create-message.dto'
import { FindRideMessagesDto } from './dto/find-ride-messages.dto'
import { MessagesService } from './messages.service'

@ApiTags('[WIP] messages')
@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post()
	create(
		@Body() createMessageDto: CreateMessageDto,
		@CurrentUser() currentUser: User
	) {
		return this.messagesService.create(createMessageDto, currentUser)
	}

	@Get()
	findAll(@Body() FindRideMessagesDto: FindRideMessagesDto) {
		return this.messagesService.findAllRideMessages(FindRideMessagesDto)
	}
}
