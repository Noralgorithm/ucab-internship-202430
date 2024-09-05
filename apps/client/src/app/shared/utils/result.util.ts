type Ok<T> = { status: 'ok'; data: T }
type Fail<T> = { status: 'fail'; data: T }

type ResultValue<T, U> = Ok<T> | Fail<U>

export class Result<T, U> {
	constructor(private readonly value: ResultValue<T, U>) {}

	static ok<T, U>(data: T): Result<T, U> {
		return new Result<T, U>({ status: 'ok', data })
	}

	static fail<T, U>(data: U) {
		return new Result<T, U>({ status: 'fail', data })
	}

	isOk(): this is Result<T, null> {
		return this.value.status === 'ok'
	}

	isFail(): this is Result<null, U> {
		return this.value.status === 'fail'
	}
}
