import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileStorageModule } from '~/shared/files-upload/file-storage/file-storage.module'
import { RidesModule } from '../rides/rides.module'
import { User } from '../users/entities/user.entity'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule,
		FileStorageModule,
		RidesModule
	],
	controllers: [ProfileController],
	providers: [ProfileService]
})
export class ProfileModule {}
