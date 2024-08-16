import { UploadFilterFile } from '@blazity/nest-file-fastify'
import { FastifyRequest } from 'fastify'
import { MAX_SIZE_IN_BYTES } from '../images.constants'

export const EXCEEDED_SIZE = MAX_SIZE_IN_BYTES + 1
export const NON_WHITELISTED_MIME_TYPE = 'application/octet-stream'

export const MOCKED_FASTIFY_REQUEST = {} as FastifyRequest

export function mockUploadFilterFile(props?: Partial<UploadFilterFile>) {
	return {
		...MOCKED_UPLOAD_FILTER_FILE_DEFAULTS,
		...props
	}
}

const MOCKED_UPLOAD_FILTER_FILE_DEFAULTS: UploadFilterFile = {
	buffer: Buffer.from(''),
	dest: '',
	encoding: '',
	fieldname: '',
	filename: '',
	mimetype: '',
	originalFilename: '',
	path: '',
	size: 0
}
