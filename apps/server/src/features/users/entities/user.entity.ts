import { DateTime } from 'luxon'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Generated,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Destination } from '~/features/destinations/entities/destination.entity'
import { Ride } from '~/features/rides/entities/ride.entity'
import { Route } from '~/features/routes/entities/route.entity'
import { Vehicle } from '~/features/vehicles/entities/vehicle.entity'
import {
	EMAIL_MAX_LENGTH,
	ENCRYPTED_PASSWORD_LENGTH,
	Gender,
	NAME_MAX_LENGTH,
	UserRole,
	UserType,
	WALK_DISTANCE_MAX_VALUE
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

	@Column({ default: WALK_DISTANCE_MAX_VALUE })
	walkDistance: number

	@Column({ type: 'enum', enum: UserRole, default: UserRole.PASSENGER })
	preferredRole: UserRole

	@Column()
	profilePicFilename: string

	@Column({ type: 'varchar', nullable: true })
	phoneNumber: string | null

	@Column({ type: 'varchar', nullable: true })
	emergencyContactPhoneNumber: string | null

	@Column({ default: false })
	isDriver: boolean

	@Column({ default: true })
	isActive: boolean

	@Column({ default: false })
	isBlocked: boolean

	@CreateDateColumn({
		type: 'timestamptz',
		transformer: LuxonDateTransformer
	})
	createdAt: DateTime

	@UpdateDateColumn({
		type: 'timestamptz',
		transformer: LuxonDateTransformer
	})
	updatedAt: DateTime

	@DeleteDateColumn({
		type: 'timestamptz',
		transformer: LuxonDateTransformer
	})
	deletedAt: DateTime

	@OneToMany(
		() => Vehicle,
		(vehicle) => vehicle.driver,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}
	)
	vehicles: Vehicle[]

	@OneToMany(
		() => Destination,
		(destination) => destination.user,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}
	)
	destinations: Destination[]

	@OneToMany(
		() => Route,
		(route) => route.user,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}
	)
	routes: Route[]

	@OneToMany(
		() => Ride,
		(ride) => ride.passenger
	)
	rides: Ride[]
}
