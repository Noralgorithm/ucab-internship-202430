import { UploadFilterFile } from '@blazity/nest-file-fastify'
import { FastifyRequest } from 'fastify'
import { MAX_SIZE_IN_BYTES, SUPPORTED_MIME_TYPES } from '../images.constants'
import { ImageSizeExceededError, InvalidImageTypeError } from '../images.errors'

export function filterImageUpload(req: FastifyRequest, file: UploadFilterFile) {
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
