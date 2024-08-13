import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { validate } from '~/app/config/env.validation'
import { AuthModule } from '~/features/auth/auth.module'
import { UsersModule } from '~/features/users/users.module'

@Module({
	imports: [
		UsersModule,
		AuthModule,
		ConfigModule.forRoot({ validate, isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				return {
					type: 'postgres',
					url: configService.get('DATABASE_URL', { infer: true }),
					autoLoadEntities: true,
					namingStrategy: new SnakeNamingStrategy()
				}
			}
		})
	]
})
export class AppModule {}
