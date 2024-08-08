import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Gender, UserRole, UserType } from '../users.constants'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'uuid' })
	uuid: string

	@Column({ length: 35 })
	firstName: string

	@Column({ length: 35 })
	lastName: string

	@Column({ length: 320 })
	email: string

	@Column({ length: 60 })
	password: string

	@Column({ enum: Gender })
	gender: Gender

	@Column({ enum: UserType })
	type: UserType

	@Column()
	walkDistance: number

	@Column({ enum: UserRole })
	preferredRole: UserRole

	@Column()
	profilePicUrl: string

	@Column()
	phoneNumber: string

	@Column()
	emergencyContactPhoneNumber: string

	@Column()
	isDriver: boolean

	@Column({ default: true })
	isActive: boolean

	@Column({ default: false })
	isBlocked: boolean
}
