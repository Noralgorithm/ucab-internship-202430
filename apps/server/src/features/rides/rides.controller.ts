import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UnprocessableEntityException
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { NotFoundError } from 'rxjs'
import { Repository } from 'typeorm'
import { Gender, RouteType, UCAB_GUAYANA_POINT } from '~/shared/constants'
import { UnknownError } from '~/shared/errors'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { Travel } from '../travels/entities/travel.entity'
import { TravelStatus } from '../travels/enums/travel-status.enum'
import { TravelsService } from '../travels/travels.service'
import { User } from '../users/entities/user.entity'
import { AnswerRequestDto } from './dto/answer-request.dto'
import { CancelRequestDto } from './dto/cancel-request.dto'
import { CreateForMeDto } from './dto/create-for-me.dto'
import { FinishRideDto } from './dto/finish-ride.dto'
import { Ride } from './entities/ride.entity'
import { TravelCancelType } from './enums/travel-cancel-type.enum'
import { RidesService } from './rides.service'

@ApiTags('[WIP] rides')
@Controller('rides')
export class RidesController {
	constructor(
		private readonly ridesService: RidesService,
		private readonly travelsService: TravelsService,
		@InjectRepository(Ride) private readonly ridesRepository: Repository<Ride>
	) {}

	@Post('for-me')
	async createForMe(
		@Body() createForMeDto: CreateForMeDto,
		@CurrentUser() currentUser: User
	) {
		let travel: Travel
		try {
			travel = await this.travelsService.findOne({
				where: { id: createForMeDto.travelId }
			})
		} catch (error: unknown) {
			if (error instanceof NotFoundError) {
				throw new UnprocessableEntityException(
					'No se encontró el viaje especificado'
				)
			}

			throw new UnknownError('', { cause: error })
		}

		if (travel.status !== TravelStatus.NOT_STARTED) {
			throw new UnprocessableEntityException(
				'El viaje ya ha comenzado o ha finalizado'
			)
		}

		if (travel.forWomen && currentUser.gender !== Gender.FEMALE) {
			throw new UnprocessableEntityException('Este viaje es solo para mujeres')
		}

		const rides = await this.ridesRepository.find({
			where: { travel, passenger: currentUser }
		})

		if (rides.filter((ride) => ride.isAccepted).length > 0) {
			throw new UnprocessableEntityException('Ya ha solicitado un ride')
		}

		if (
			rides.filter(
				(ride) => ride.travelCancelType === TravelCancelType.DRIVER_DENIAL
			).length > 0
		) {
			throw new UnprocessableEntityException(
				'Ha sido rechazado por un conductor'
			)
		}

		if (travel.type === RouteType.FROM_UCAB) {
			return await this.ridesService.create({
				destination: createForMeDto.point,
				origin: UCAB_GUAYANA_POINT,
				passenger: currentUser,
				travel
			})
		}

		if (travel.type === RouteType.TO_UCAB) {
			return await this.ridesService.create({
				destination: UCAB_GUAYANA_POINT,
				origin: createForMeDto.point,
				passenger: currentUser,
				travel
			})
		}

		throw new UnprocessableEntityException('Tipo de ruta no soportado')
	}

	@Get(':id')
	async findOne(@Param('id') id: string, @CurrentUser() currentUser: User) {
		await this.ridesService.findOne({
			where: [
				{ id, travel: { vehicle: { driver: { id: currentUser.id } } } },
				{ id, passenger: { id: currentUser.id } }
			]
		})

		return await this.ridesService.findOne({
			where: { id: id },
			relations: { travel: { vehicle: { driver: true } } }
		})
	}

	@Patch(':id/answer-ride-request')
	async answerRequest(
		@Param('id') id: string,
		@Body() answerRequestDto: AnswerRequestDto,
		@CurrentUser() currentUser: User
	) {
		await this.ridesService.findOne({
			where: [
				{ id, travel: { vehicle: { driver: { id: currentUser.id } } } },
				{ id, passenger: { id: currentUser.id } }
			]
		})

		return await this.ridesService.answerRequest(
			{ where: { id } },
			answerRequestDto
		)
	}

	@Patch(':id/cancel-ride')
	async cancelRequest(
		@Param('id') id: string,
		@Body() cancelRequestDto: CancelRequestDto,
		@CurrentUser() currentUser: User
	) {
		await this.ridesService.findOne({
			where: [
				{ id, travel: { vehicle: { driver: { id: currentUser.id } } } },
				{ id, passenger: { id: currentUser.id } }
			]
		})

		await this.ridesService.cancelRequest({ where: { id } }, cancelRequestDto)

		return 'Ride cancelled'
	}

	@Patch(':id/finish-ride')
	async finishRide(
		@Param('id') id: string,
		@Body() finishRideDto: FinishRideDto,
		@CurrentUser() currentUser: User
	) {
		await this.ridesService.findOne({
			where: { id, passenger: { id: currentUser.id } }
		})

		await this.ridesService.complete(finishRideDto)

		return 'Ride finished'
	}
}
