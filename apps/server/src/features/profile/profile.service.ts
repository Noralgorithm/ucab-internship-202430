import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { ProfileDto } from './dto/profile.dto'

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async getUserProfile(id: User['id']): Promise<ProfileDto> {
		const user = await this.usersRepository.findOneBy({ id })

		if (user == null) {
			throw new NotFoundException('Usuario no encontrado')
		}

		return ProfileDto.from(user)
	}
}
