import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MailingService } from './mailing.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				transport: {
					host: configService.get('MAIL_HOST'),
					port: Number(configService.get<string>('MAIL_PORT')),
					secure: configService.get('MAIL_SECURE') === 'true', //TODO: change this to use a better configService that correctly parses everything to the correct type
					auth: {
						user: configService.get('MAIL_USER'),
						pass: configService.get('MAIL_PASS')
					}
				},
				defaults: {
					from: configService.get('MAIL_FROM')
				}
			})
		})
	],
	providers: [MailingService],
	exports: [MailingService]
})
export class MailingModule {}
