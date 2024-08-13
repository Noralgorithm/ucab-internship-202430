import { plainToInstance } from 'class-transformer'
import {
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
	SERVER_PORT: number

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
