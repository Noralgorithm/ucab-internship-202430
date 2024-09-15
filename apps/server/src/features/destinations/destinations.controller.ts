import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Req,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { DestinationsService } from './destinations.service'
import { CreateDestinationDto } from './dto/create-destination.dto'
import { UpdateDestinationDto } from './dto/update-destination.dto'

@ApiTags('[WIP] destinations')
@Controller('destinations')
export class DestinationsController {
	constructor(
		private readonly destinationsService: DestinationsService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	@HttpCode(201)
	@Post()
	async create(
		@Req() req: FastifyRequest,
		@Body() createDestinationDto: CreateDestinationDto
	) {
		//TODO: extract this logic to a middleware/service/decorator/interceptor
		const token = req.headers.authorization?.split('Bearer ')[1]

		if (token == null) {
			throw new UnauthorizedException(
				'No se ha proporcionado un token de autorización'
			)
		}

		const payload = await this.jwtService.verifyAsync(token, {
			secret: this.configService.get('JWT_SECRET')
		})

		if (payload == null) {
			throw new UnauthorizedException(
				'No se ha proporcionado un token de autorización'
			)
		}

		const userId = payload['sub']

		return this.destinationsService.create(userId, createDestinationDto)
	}

	@HttpCode(200)
	@Get('mine')
	async findAll(@Req() req: FastifyRequest) {
		//TODO: extract this logic to a middleware/service/decorator/interceptor
		const token = req.headers.authorization?.split('Bearer ')[1]

		if (token == null) {
			throw new UnauthorizedException(
				'No se ha proporcionado un token de autorización'
			)
		}

		const payload = await this.jwtService.verifyAsync(token, {
			secret: this.configService.get('JWT_SECRET')
		})

		if (payload == null) {
			throw new UnauthorizedException(
				'No se ha proporcionado un token de autorización'
			)
		}

		const userId = payload['sub']

		return this.destinationsService.findByPassenger(userId)
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.destinationsService.findByDestination(id)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateDestinationDto: UpdateDestinationDto
	) {
		return this.destinationsService.update(+id, updateDestinationDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.destinationsService.remove(+id)
	}
}
