import { readFile } from 'node:fs/promises'
import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { UnknownError } from '../errors'
import { MailingError } from './mailing.errors'

const MAILING_ERROR_DEFAULT_MESSAGE = 'Error sending mail'
const UNKNOWN_ERROR_DEFAULT_MESSAGE = 'Unknown error sending mail'

@Injectable()
export class MailingService {
	constructor(private readonly mailerService: MailerService) {}

	async sendMailWithHtml({
		to,
		subject,
		html
	}: {
		to: string
		subject: string
		html: string | Buffer
	}): Promise<void> {
		try {
			await this.mailerService.sendMail({
				to,
				subject,
				text: html.toString(),
				html
			})
		} catch (e: unknown) {
			console.error(e)
			if (e instanceof Error) {
				throw new MailingError(MAILING_ERROR_DEFAULT_MESSAGE, {
					cause: e
				})
			}

			throw new UnknownError(UNKNOWN_ERROR_DEFAULT_MESSAGE, { cause: e })
		}
	}

	async sendMailWithTemplate({
		to,
		subject,
		templatePath,
		templateType
	}: {
		to: string
		subject: string
		templatePath: string
		templateType: 'html' | 'mjml'
	}): Promise<void> {
		let html: string | Buffer = ''
		let text = ''

		let _exhaustiveCheck: never
		switch (templateType) {
			case 'html':
				html = await readFile(templatePath)
				text = html.toString('utf-8')
				break
			case 'mjml':
				throw new Error('Not implemented yet')
			// break
			default:
				_exhaustiveCheck = templateType
				_exhaustiveCheck
				throw new Error('Not supported template type')
		}

		try {
			await this.mailerService.sendMail({
				to,
				subject,
				text,
				html
			})
		} catch (e: unknown) {
			if (e instanceof Error) {
				throw new MailingError(MAILING_ERROR_DEFAULT_MESSAGE, {
					cause: e
				})
			}

			throw new UnknownError(UNKNOWN_ERROR_DEFAULT_MESSAGE, { cause: e })
		}
	}
}
