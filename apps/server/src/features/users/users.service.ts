import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>
	) {}

	async findAll(options?: FindManyOptions<User>) {
		return this.usersRepository.find(options)
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
