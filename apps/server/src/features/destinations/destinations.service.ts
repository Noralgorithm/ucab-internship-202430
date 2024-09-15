import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UnknownError } from '~/shared/errors'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { CreateDestinationDto } from './dto/create-destination.dto'
import { UpdateDestinationDto } from './dto/update-destination.dto'
import { Destination } from './entities/destination.entity'

@Injectable()
export class DestinationsService {
	constructor(
		@InjectRepository(Destination)
		private readonly destinationsRepository: Repository<Destination>,
		private readonly usersService: UsersService
	) {}

	async create(
		passengerId: User['id'],
		createDestinationDto: CreateDestinationDto
	) {
		let passenger: User

		try {
			passenger = await this.usersService.findOne(passengerId)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Passenger does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		return this.destinationsRepository.save({
			...createDestinationDto,
			passenger
		})
	}

	async findByPassenger(passengerId: User['id']) {
		try {
			await this.usersService.findOne(passengerId)
		} catch (error: unknown) {
			if (error instanceof NotFoundException) {
				throw new UnprocessableEntityException('Passenger does not exist')
			}

			throw new UnknownError(undefined, { cause: error })
		}

		return await this.destinationsRepository.find({
			where: { user: { id: passengerId } },
			order: { createdAt: 'DESC' }
		})
	}

	async findByDestination(destinationId: Destination['id']) {
		return await this.destinationsRepository.findOneBy({ id: destinationId })
	}

	async update(id: number, updateDestinationDto: UpdateDestinationDto) {
		return `This action updates a #${id} destination`
	}

	async remove(id: number) {
		return `This action removes a #${id} destination`
	}
}
