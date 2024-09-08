import { Expose, plainToInstance } from 'class-transformer'
import { User } from '~/features/users/entities/user.entity'
import { Gender, UserRole, UserType } from '~/shared/constants'

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
	static from(user: User) {
		return plainToInstance(ProfileDto, user satisfies ProfileDto, {
			excludeExtraneousValues: true
		})
	}
}
