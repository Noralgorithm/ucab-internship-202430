import { MAX_SIZE_IN_BYTES, SUPPORTED_MIME_TYPES } from '../images.constants'
import { ImageSizeExceededError, InvalidImageTypeError } from '../images.errors'
import { filterImageUpload } from './filter-image-upload'
import {
	EXCEEDED_SIZE,
	MOCKED_FASTIFY_REQUEST,
	NON_WHITELISTED_MIME_TYPE,
	mockUploadFilterFile
} from './spec.utils'

describe('filterImageUpload', () => {
	it('should throw ImageSizeExceededError when size is over the limit', () => {
		expect(() =>
			filterImageUpload(
				MOCKED_FASTIFY_REQUEST,
				mockUploadFilterFile({ size: EXCEEDED_SIZE })
			)
		).toThrow(ImageSizeExceededError)
	})

	it('should throw InvalidImageTypeError when image mime type is not in the whitelist', () => {
		expect(() =>
			filterImageUpload(
				MOCKED_FASTIFY_REQUEST,
				mockUploadFilterFile({ mimetype: NON_WHITELISTED_MIME_TYPE })
			)
		).toThrow(InvalidImageTypeError)
	})

	it('should throw ImageSizeExceededError when size is over the limit and mime type is not in the whitelist', () => {
		expect(() =>
			filterImageUpload(
				MOCKED_FASTIFY_REQUEST,
				mockUploadFilterFile({
					size: EXCEEDED_SIZE,
					mimetype: NON_WHITELISTED_MIME_TYPE
				})
			)
		).toThrow(ImageSizeExceededError)
	})

	it('should return true in any other case', () => {
		expect(
			filterImageUpload(
				MOCKED_FASTIFY_REQUEST,
				mockUploadFilterFile({
					mimetype: SUPPORTED_MIME_TYPES[0],
					size: MAX_SIZE_IN_BYTES
				})
			)
		).toBe(true)
	})
})
