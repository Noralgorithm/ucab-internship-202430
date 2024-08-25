import {
	Controller,
	Delete,
	Get,
	NotImplementedException,
	Param,
	ParseUUIDPipe,
	Patch,
	Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(createUserDto: CreateUserDto) {
		throw new NotImplementedException()
	}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.usersService.findOne(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, updateUserDto: UpdateUserDto) {
		throw new NotImplementedException()
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id)
	}
}
