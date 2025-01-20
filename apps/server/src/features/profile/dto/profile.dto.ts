import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform, Type, plainToInstance } from 'class-transformer'
import { DateTime } from 'luxon'
import { User } from '~/features/users/entities/user.entity'
import { Gender, UserRole, UserType } from '~/shared/constants'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'

export class ProfileDto {
	@Expose()
	firstName: string

	@Expose()
	lastName: string

	@Expose()
	email: string

	@Expose()
	gender: Gender

	@Expose()
	type: UserType

	@Expose()
	walkDistance: number

	@Expose()
	preferredRole: UserRole

	@Expose()
	profilePicFilename: string

	@Expose()
	phoneNumber: string | null

	@Expose()
	emergencyContactPhoneNumber: string | null

	@Expose()
	isDriver: boolean

	@Expose()
	isActive: boolean

	@Expose()
	isBlocked: boolean

	@Expose()
	rating: number

	@Expose()
	reviewsQuantity: number

	@ApiProperty({ type: 'string', format: 'date-time' })
	@Expose()
	@Type(() => Date)
	@Transform(({ value }) => LuxonDateTransformer.from(value), {
		toClassOnly: true
	})
	canRideAt: DateTime

	@Expose()
	static from(user: User & { rating: number; reviewsQuantity: number }) {
		return plainToInstance(ProfileDto, user satisfies ProfileDto, {
			excludeExtraneousValues: true
		})
	}
}
