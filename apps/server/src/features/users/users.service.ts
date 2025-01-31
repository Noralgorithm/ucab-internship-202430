import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm'
import { RidesService } from '../rides/rides.service'
import { TravelsService } from '../travels/travels.service'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
		private readonly travelsService: TravelsService,
		private readonly ridesService: RidesService
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

	async checkStatus(currentUser: User) {
		const isOnTravel = await this.travelsService.getUserUnfinishedTravel(
			currentUser.id
		)

		if (isOnTravel.isIn) {
			return isOnTravel
		}

		const isOnRide = await this.ridesService.getUserUnfinishedRide(
			currentUser.id
		)

		if (isOnRide.isIn) {
			return isOnRide
		}

		return { isIn: false, payload: null }
	}

	async updateRatingAsPassenger(id: User['id']) {
		await this.findOne(id)

		const rides = await this.ridesService.find({
			where: { passenger: { id }, driverStarRating: Not(IsNull()) }
		})

		if (rides.length === 0) {
			return
		}

		const [accumulatedStarRating, reviewsQuantity] = rides.reduce(
			(acc, cur) =>
				cur.driverStarRating == null
					? acc
					: [acc[0] + cur.driverStarRating, acc[1] + 1],
			[0, 0]
		)

		await this.usersRepository.update(
			{ id },
			{
				starRatingAsPassenger: accumulatedStarRating / reviewsQuantity,
				reviewsQuantityAsPassenger: reviewsQuantity
			}
		)
	}

	async updateRatingAsDriver(id: User['id']) {
		await this.findOne(id)

		const rides = await this.ridesService.find({
			where: {
				travel: { vehicle: { driver: { id } } },
				passengerStarRating: Not(IsNull())
			}
		})

		if (rides.length === 0) {
			return
		}

		const [accumulatedStarRating, reviewsQuantity] = rides.reduce(
			(acc, cur) =>
				cur.passengerStarRating == null
					? acc
					: [acc[0] + cur.passengerStarRating, acc[1] + 1],
			[0, 0]
		)

		await this.usersRepository.update(
			{ id },
			{
				starRatingAsDriver: accumulatedStarRating / reviewsQuantity,
				reviewsQuantityAsDriver: reviewsQuantity
			}
		)
	}

	async updateTotalRating(id: User['id']) {
		await this.updateRatingAsPassenger(id)
		await this.updateRatingAsDriver(id)

		const user = await this.findOne(id)

		const totalReviewsQuantity =
			user.reviewsQuantityAsPassenger + user.reviewsQuantityAsDriver
		const accumulatedStarRatingAsPassenger =
			user.starRatingAsPassenger == null
				? 0
				: user.starRatingAsPassenger * user.reviewsQuantityAsPassenger
		const accumulatedStarRatingAsDriver =
			user.starRatingAsDriver == null
				? 0
				: user.starRatingAsDriver * user.reviewsQuantityAsDriver
		const totalStarRating =
			(accumulatedStarRatingAsPassenger + accumulatedStarRatingAsDriver) /
			totalReviewsQuantity

		await this.usersRepository.update(
			{ id },
			{
				totalStarRating,
				totalReviewsQuantity
			}
		)
	}
}
