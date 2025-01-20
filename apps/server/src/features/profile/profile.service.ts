import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FileStorageService } from '~/shared/files-upload/file-storage/file-storage.service'
import { RidesService } from '../rides/rides.service'
import { User } from '../users/entities/user.entity'
import { ProfileDto } from './dto/profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly fileStorageService: FileStorageService,
		private readonly ridesService: RidesService
	) {}

	async getUserProfile(id: User['id']): Promise<ProfileDto> {
		const user = await this.usersRepository.findOne({
			where: { id },
			relations: { rides: { passenger: true } }
		})

		if (user == null) {
			throw new NotFoundException('Usuario no encontrado')
		}

		const [rating, quantity] = this.ridesService.calculateRating(id, user.rides)

		const ratedUser: User & { rating: number; amountOfRapes: number } = {
			...user,
			rating,
			amountOfRapes: quantity
		}

		return ProfileDto.from(ratedUser)
	}

	async updateUserProfile(id: User['id'], updateProfileDto: UpdateProfileDto) {
		const user = await this.usersRepository.findOneBy({ id })

		if (user == null) {
			throw new NotFoundException('Usuario no encontrado')
		}

		if (updateProfileDto.profilePic == null) {
			await this.usersRepository.update(
				{ id },
				{
					preferredRole: updateProfileDto.preferredRole,
					walkDistance: updateProfileDto.walkDistance,
					phoneNumber: updateProfileDto.phoneNumber,
					emergencyContactPhoneNumber:
						updateProfileDto.emergencyContactPhoneNumber
				}
			)
		} else {
			const profilePicFilename = this.fileStorageService.save(
				updateProfileDto.profilePic
			)

			await this.usersRepository.update(
				{ id },
				{
					preferredRole: updateProfileDto.preferredRole,
					walkDistance: updateProfileDto.walkDistance,
					phoneNumber: updateProfileDto.phoneNumber,
					emergencyContactPhoneNumber:
						updateProfileDto.emergencyContactPhoneNumber,
					profilePicFilename
				}
			)
		}

		return 'Perfil actualizado con éxito mi pana'
	}
}
