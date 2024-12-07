import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.usersService.findOne(id)
	}

	@Get('status')
	checkStatus(@CurrentUser() currentUser: User) {
		this.usersService.checkStatus(currentUser)
	}
}
