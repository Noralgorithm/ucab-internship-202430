import {
	Body,
	Controller,
	Post,
	UnprocessableEntityException
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { NotFoundError } from 'rxjs'
import { UCAB_GUAYANA_POINT } from '~/shared/constants'
import { UnknownError } from '~/shared/errors'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { Travel } from '../travels/entities/travel.entity'
import { TravelsService } from '../travels/travels.service'
import { User } from '../users/entities/user.entity'
import { CreateForMeDto } from './dto/create-for-me.dto'
import { RidesService } from './rides.service'

@ApiTags('[WIP] rides')
@Controller('rides')
export class RidesController {
	constructor(
		private readonly ridesService: RidesService,
		private readonly travelsService: TravelsService
	) {}

	@Post('from-ucab/for-me')
	async createFromUcabForMe(
		@CurrentUser() currentUser: User,
		@Body() createForMeDto: CreateForMeDto
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

		return await this.ridesService.create({
			destination: createForMeDto.point,
			origin: UCAB_GUAYANA_POINT,
			passenger: currentUser,
			travel
		})
	}

	@Post('to-ucab/for-me')
	async createToUcabForMe(
		@CurrentUser() currentUser: User,
		@Body() createForMeDto: CreateForMeDto
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

		return await this.ridesService.create({
			destination: UCAB_GUAYANA_POINT,
			origin: createForMeDto.point,
			passenger: currentUser,
			travel
		})
	}
}
