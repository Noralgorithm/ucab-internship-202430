import { UploadFilterFile } from '@blazity/nest-file-fastify'
import { FastifyRequest } from 'fastify'
import { ImageSizeExceededError, InvalidImageTypeError } from './images.errors'

const MAX_SIZE_IN_BYTES = 10_000_000 // 10 MB
const SUPPORTED_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/webp',
	'images/avif'
]

export function filterImageUpload(
	_req: FastifyRequest,
	file: UploadFilterFile
) {
	validateSize(file, MAX_SIZE_IN_BYTES)
	validateType(file, SUPPORTED_MIME_TYPES)

	return true
}

function validateSize(file: UploadFilterFile, maxSizeInBytes: number) {
	if (file.size > maxSizeInBytes)
		throw new ImageSizeExceededError(file.size, maxSizeInBytes)
}

function validateType(file: UploadFilterFile, supportedTypes: string[]) {
	if (!supportedTypes.includes(file.mimetype))
		throw new InvalidImageTypeError(file.mimetype, supportedTypes)
}
