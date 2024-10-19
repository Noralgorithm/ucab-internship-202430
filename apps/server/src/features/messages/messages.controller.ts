import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '~/features/auth/decorators/current-user.decorator'
import { User } from '~/features/users/entities/user.entity'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessagesService } from './messages.service'

@ApiTags('[WIP] messages')
@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post(':id')
	create(
		@Param('id') id: string,
		@Body() createMessageDto: CreateMessageDto,
		@CurrentUser() currentUser: User
	) {
		return this.messagesService.create(id, createMessageDto, currentUser)
	}

	@Get(':id')
	findAll(@Param('id') id: string, @CurrentUser() currentUser: User) {
		return this.messagesService.findAllRideMessages(id, currentUser)
	}
}
