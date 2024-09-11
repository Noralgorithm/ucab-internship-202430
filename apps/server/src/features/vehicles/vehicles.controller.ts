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
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { DeleteVehicleParamsDto } from './dto/delete-vehicle-params.dto'
import { UpdateVehicleParamsDto } from './dto/update-vehicle-params.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { VehiclesService } from './vehicles.service'

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
	constructor(
		private readonly vehiclesService: VehiclesService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	@HttpCode(200)
	@Get('mine')
	async findMine(@Req() req: FastifyRequest) {
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

		return await this.vehiclesService.findByDriver(userId)
	}

	@HttpCode(201)
	@Post()
	async create(
		@Req() req: FastifyRequest,
		@Body() createVehicleDto: CreateVehicleDto
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

		return await this.vehiclesService.create(userId, createVehicleDto)
	}

	@HttpCode(200)
	@Patch(':id')
	async update(
		@Param() { id }: UpdateVehicleParamsDto,
		@Req() req: FastifyRequest,
		@Body() updateVehicleDto: UpdateVehicleDto
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

		await this.vehiclesService.update(id, userId, updateVehicleDto)

		return 'Vehículo actualizado con éxito mi pana'
	}

	@HttpCode(200)
	@Delete(':id')
	async remove(
		@Param() { id }: DeleteVehicleParamsDto,
		@Req() req: FastifyRequest
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

		await this.vehiclesService.remove(id, userId)

		return 'Vehículo eliminado con éxito mi pana'
	}
}
