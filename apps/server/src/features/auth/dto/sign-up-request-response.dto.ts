import { ApiProperty } from '@nestjs/swagger'
import { DateTime } from 'luxon'
import { SignUpRequest } from '../entities/sign-up-request.entity'

export class SignUpRequestResponseDto {
	id: string

	email: string

	@ApiProperty({ type: 'string', format: 'date-time' })
	expirationDate: DateTime

	constructor(id: string, email: string, expirationDate: DateTime) {
		this.id = id
		this.email = email
		this.expirationDate = expirationDate
	}

	static from(signUpRequest: SignUpRequest) {
		const { id, email, expirationDate } = signUpRequest

		return new SignUpRequestResponseDto(id, email, expirationDate)
	}
}
