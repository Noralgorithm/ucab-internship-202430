import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import {
	EMAIL_MAX_LENGTH,
	Gender,
	NAME_MAX_LENGTH,
	UserRole,
	UserType
} from '../users.constants'

const ENCRYPTED_PASSWORD_LENGTH = 60

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	internalId: number

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

	@Column({ enum: Gender })
	gender: Gender

	@Column({ enum: UserType })
	type: UserType

	@Column({ nullable: false })
	walkDistance: number

	@Column({ enum: UserRole })
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
}
