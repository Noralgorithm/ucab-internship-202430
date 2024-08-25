import { DateTime } from 'luxon'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Generated,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import {
	EMAIL_MAX_LENGTH,
	ENCRYPTED_PASSWORD_LENGTH,
	Gender,
	NAME_MAX_LENGTH,
	UserRole,
	UserType
} from '~/shared/constants'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'

@Entity({ name: 'users' })
@Index(['id', 'deletedAt'], { unique: true })
@Index(['email', 'deletedAt'], { unique: true })
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

	@Column({ length: EMAIL_MAX_LENGTH, unique: true })
	email: string

	@Column({ length: ENCRYPTED_PASSWORD_LENGTH, select: false })
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
	profilePicFilename: string

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

	@CreateDateColumn({
		type: 'timestamp',
		transformer: LuxonDateTransformer
	})
	createdAt: DateTime

	@UpdateDateColumn({
		type: 'timestamp',
		transformer: LuxonDateTransformer
	})
	updatedAt: DateTime

	@DeleteDateColumn({
		type: 'timestamp',
		transformer: LuxonDateTransformer
	})
	deletedAt: DateTime
}
