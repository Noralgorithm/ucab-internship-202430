import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileStorageModule } from '~/shared/files-upload/file-storage/file-storage.module'
import { User } from '../users/entities/user.entity'
import { UsersModule } from '../users/users.module'
import { DestinationsController } from './destinations.controller'
import { DestinationsService } from './destinations.service'
import { Destination } from './entities/destination.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([Destination, User]),
		UsersModule,
		JwtModule,
		FileStorageModule
	],
	controllers: [DestinationsController],
	providers: [DestinationsService]
})
export class DestinationsModule {}
