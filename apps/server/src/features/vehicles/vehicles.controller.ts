import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { DeleteVehicleParamsDto } from './dto/delete-vehicle-params.dto'
import { UpdateVehicleParamsDto } from './dto/update-vehicle-params.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { VehiclesService } from './vehicles.service'

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
	constructor(private readonly vehiclesService: VehiclesService) {}

	@HttpCode(200)
	@Get('mine')
	async findMine(@CurrentUser() currentUser: User) {
		return await this.vehiclesService.findByDriver(currentUser.id)
	}

	@HttpCode(200)
	@Get(':id')
	async findOne(@Param() { id }: UpdateVehicleParamsDto) {
		return await this.vehiclesService.findByVehicle(id)
	}

	@HttpCode(201)
	@Post()
	async create(
		@CurrentUser() currentUser: User,
		@Body() createVehicleDto: CreateVehicleDto
	) {
		return await this.vehiclesService.create(currentUser.id, createVehicleDto)
	}

	@HttpCode(200)
	@Patch(':id')
	async update(
		@Param() { id }: UpdateVehicleParamsDto,
		@CurrentUser() currentUser: User,
		@Body() updateVehicleDto: UpdateVehicleDto
	) {
		await this.vehiclesService.update(id, currentUser.id, updateVehicleDto)

		return 'Vehículo actualizado con éxito mi pana'
	}

	@HttpCode(200)
	@Delete(':id')
	async remove(
		@Param() { id }: DeleteVehicleParamsDto,
		@CurrentUser() currentUser: User
	) {
		await this.vehiclesService.remove(id, currentUser.id)

		return 'Vehículo eliminado con éxito mi pana'
	}
}
