import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { CreateMessageAsPassengerDto } from './dto/create-message-as-passenger.dto'
import { MessagesService } from './messages.service'

@ApiTags('[WIP] messages')
@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post()
	create(
		@Body() createMessageDto: CreateMessageAsPassengerDto,
		@CurrentUser() currentUser: User
	) {
		return this.messagesService.createAsPassenger(createMessageDto, currentUser)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.messagesService.findOne(+id)
	}
}
