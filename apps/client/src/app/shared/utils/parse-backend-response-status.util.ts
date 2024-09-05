import { Err, Ok, Result } from 'ts-results'
import { BackendResponse } from '../types/backend-response.type'

export function parseBackendResponseStatus<T, U>(
	response: BackendResponse<T, U>
): Result<T, U> {
	if (response.status === 'success') {
		return Ok(response.data)
	}

	return Err(response.data)
}
