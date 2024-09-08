import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

@Module({
	imports: [TypeOrmModule.forFeature([User]), JwtModule],
	controllers: [ProfileController],
	providers: [ProfileService]
})
export class ProfileModule {}
