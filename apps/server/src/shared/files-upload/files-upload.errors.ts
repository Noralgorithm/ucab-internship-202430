export class FileUploadError extends Error {
	constructor(message?: string) {
		super(message ?? 'Error uploading file')
	}
}
