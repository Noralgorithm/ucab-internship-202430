import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'src/features/users/users.module'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { validate } from './config/env.validation'

@Module({
	imports: [
		ConfigModule.forRoot({ validate }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				return {
					type: 'postgres',
					url: configService.get('DATABASE_URL'),
					autoLoadEntities: true,
					namingStrategy: new SnakeNamingStrategy()
				}
			}
		}),
		UsersModule
	]
})
export class AppModule {}
