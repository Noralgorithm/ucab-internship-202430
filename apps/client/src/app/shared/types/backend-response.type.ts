export type BackendResponse<T, U> = SuccesfulResponse<T> | FailResponse<U>

export interface SuccesfulResponse<T> {
	status: 'success'
	data: T
}

export interface FailResponse<U> {
	status: 'fail'
	data: U
}
