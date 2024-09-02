import { plainToInstance } from 'class-transformer'
import {
	IsEmail,
	IsInt,
	IsPort,
	IsPositive,
	IsString,
	IsUrl,
	Max,
	validateSync
} from 'class-validator'

class EnvironmentVariables {
	@IsPort()
	SERVER_PORT: string

	@IsUrl({
		allow_trailing_dot: false,
		allow_fragments: false,
		allow_protocol_relative_urls: false,
		allow_query_components: false,
		allow_underscores: false,
		protocols:
			process.env.NODE_ENV === 'production' ? ['https'] : ['http', 'https'],
		require_host: true,
		require_valid_protocol: true,
		require_protocol: process.env.NODE_ENV === 'production',
		require_tld: process.env.NODE_ENV === 'production'
	})
	@IsString()
	CLIENT_URL: string

	@IsUrl({
		allow_trailing_dot: false,
		allow_protocol_relative_urls: false,
		protocols: ['postgres', 'postgresql'],
		require_host: true,
		require_protocol: true,
		require_valid_protocol: true,
		require_tld: false
	})
	@IsString()
	DATABASE_URL: string

	@IsUrl({
		allow_trailing_dot: false,
		allow_fragments: false,
		allow_protocol_relative_urls: false,
		allow_query_components: false,
		allow_underscores: false,
		protocols: ['https'],
		require_host: true,
		require_valid_protocol: true,
		require_protocol: process.env.NODE_ENV === 'production',
		require_tld: process.env.NODE_ENV === 'production'
	})
	@IsString()
	JWT_ISSUER: string

	@IsUrl({
		allow_trailing_dot: false,
		allow_fragments: false,
		allow_protocol_relative_urls: false,
		allow_query_components: false,
		allow_underscores: false,
		protocols: ['https'],
		require_host: true,
		require_valid_protocol: true,
		require_protocol: process.env.NODE_ENV === 'production',
		require_tld: process.env.NODE_ENV === 'production'
	})
	@IsString()
	JWT_AUD: string

	@Max(60)
	@IsPositive()
	@IsInt()
	JWT_EXP_DAYS: number

	@IsPositive()
	@IsInt()
	JWT_NBF_SECONDS_OFFSET: number

	@IsString()
	LOCAL_FILE_STORAGE_PATH: string

	@IsUrl({
		allow_trailing_dot: false,
		allow_protocol_relative_urls: false,
		allow_query_components: true,
		require_host: true,
		require_tld: true,
		require_protocol: false
	})
	@IsString()
	MAIL_HOST: string

	@IsPort()
	MAIL_PORT: string

	@IsString()
	MAIL_USER: string

	@IsString()
	MAIL_PASS: string

	@IsEmail({ allow_display_name: true })
	@IsString()
	MAIL_FROM: string
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true
	})

	const errors = validateSync(validatedConfig, { skipMissingProperties: false })

	if (errors.length > 0) {
		const errorsMessage = errors
			.map((val) =>
				val
					.toString()
					.replace(
						'An instance of EnvironmentVariables has failed the validation:',
						''
					)
					.replace('\n', '')
			)
			.reduce((prev, cur) => `${prev}${cur}`)

		throw new EnvironmentVariablesError(errorsMessage)
	}

	return validatedConfig
}

class EnvironmentVariablesError extends Error {
	constructor(message?: string) {
		super(`\n${message}`)
		this.name = 'EnvironmentVariablesError'
	}
}
