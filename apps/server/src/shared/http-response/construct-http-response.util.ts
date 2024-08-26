import { HttpStatus } from '@nestjs/common'
import { HttpResponse } from './http-response.type'

export function constructHttpResponse<T>(
	statusCode: HttpStatus,
	data?: T,
	message?: string
): HttpResponse<T> {
	if (statusCode >= 200 && statusCode < 400) {
		if (!data) throw new Error('Data is required for success responses')

		return {
			status: 'success',
			data
		}
	}

	if (statusCode >= 400 && statusCode < 500) {
		if (!data) throw new Error('Data is required for fail responses')

		return {
			status: 'fail',
			data
		}
	}

	if (!message) throw new Error('Message is required for error responses')

	return {
		status: 'error',
		message: message,
		data
	}
}
