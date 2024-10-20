import { pascalToSentenceLikeCase } from './utils/pacal-to-sentence-like-case'

export class BaseError extends Error {
	constructor(message?: string, options?: ErrorOptions) {
		super(message, options)
		this.name = this.constructor.name
		this.message =
			this.message === '' ? pascalToSentenceLikeCase(this.name) : this.message
	}
}

export class UnknownError extends BaseError {}

export class MalformedGeoJsonLineStringError extends BaseError {}

//TODO: create exception filter to handle this cases
