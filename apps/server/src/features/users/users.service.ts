import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>
	) {}

	async findAll() {
		return this.usersRepository.find()
	}

	async findOne(id: string) {
		const user = await this.usersRepository.findOneBy({ id })

		if (user == null) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	async findDeleted() {
		return await this.usersRepository.find({ withDeleted: true })
	}

	async remove(id: string) {
		const userToRemove = await this.findOne(id)

		this.usersRepository.softDelete({ id })

		return userToRemove
	}
}
