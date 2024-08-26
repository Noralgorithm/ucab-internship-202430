import { FileUploadError } from '../files-upload.errors'

export class ImageUploadError extends FileUploadError {
	constructor(message?: string, options?: ErrorOptions) {
		super(message ?? 'Error uploading image', options)
	}
}

export class InvalidImageTypeError extends ImageUploadError {
	constructor(
		public currentType: string,
		public supportedTypes: string[],
		message?: string,
		options?: ErrorOptions
	) {
		super(message ?? 'Invalid image type', options)
	}
}

export class ImageSizeExceededError extends ImageUploadError {
	constructor(
		public currentSizeInBytes: number,
		public maxSizeInBytes,
		message?: string,
		options?: ErrorOptions
	) {
		super(message ?? 'The iamge size limit has been exceeded', options)
	}
}
