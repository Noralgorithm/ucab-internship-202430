import { FileInterceptor, UploadOptions } from '@blazity/nest-file-fastify'
import { filterImageUpload } from './filter-image-upload/filter-image-upload'

const DEFAULT_OPTIONS: UploadOptions = {
	filter: filterImageUpload
}

export function ImageInterceptor(
	fieldname: string,
	options: UploadOptions = DEFAULT_OPTIONS
) {
	return FileInterceptor(fieldname, options)
}
