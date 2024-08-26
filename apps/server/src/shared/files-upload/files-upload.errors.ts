import { BaseError } from '../errors'

export class FileUploadError extends BaseError {
	constructor(message?: string, options?: ErrorOptions) {
		super(message ?? 'Error uploading file', options)
	}
}
