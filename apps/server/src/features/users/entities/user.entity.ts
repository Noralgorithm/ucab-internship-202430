import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'
import { AtDates } from '~/shared/at-dates.entity'
import {
	EMAIL_MAX_LENGTH,
	ENCRYPTED_PASSWORD_LENGTH,
	Gender,
	NAME_MAX_LENGTH,
	UserRole,
	UserType
} from '~/shared/constants'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	@Column({ length: NAME_MAX_LENGTH })
	firstName: string

	@Column({ length: NAME_MAX_LENGTH })
	lastName: string

	@Column({ length: EMAIL_MAX_LENGTH })
	email: string

	@Column({ length: ENCRYPTED_PASSWORD_LENGTH })
	encryptedPassword: string

	@Column({ type: 'enum', enum: Gender })
	gender: Gender

	@Column({ type: 'enum', enum: UserType })
	type: UserType

	@Column({ default: 150 })
	walkDistance: number

	@Column({ type: 'enum', enum: UserRole, default: UserRole.PASSENGER })
	preferredRole: UserRole

	@Column()
	profilePicUrl: string

	@Column()
	phoneNumber: string

	@Column()
	emergencyContactPhoneNumber: string

	@Column({ default: false })
	isDriver: boolean

	@Column({ default: true })
	isActive: boolean

	@Column({ default: false })
	isBlocked: boolean

	@Column(() => AtDates, { prefix: false })
	atDates: AtDates
}
