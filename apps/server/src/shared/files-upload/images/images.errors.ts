import { FileUploadError } from '../files-upload.errors'

//TODO: create exception filter to handle this cases

export class ImageUploadError extends FileUploadError {
	constructor(message?: string) {
		super(message ?? 'Error uploading image')
	}
}

export class InvalidImageTypeError extends ImageUploadError {
	constructor(
		public currentType: string,
		public supportedTypes: string[],
		message?: string
	) {
		super(message ?? 'Invalid image type')
	}
}

export class ImageSizeExceededError extends ImageUploadError {
	constructor(
		public currentSizeInBytes: number,
		public maxSizeInBytes,
		message?: string
	) {
		super(message ?? 'The iamge size limit has been exceeded')
	}
}
