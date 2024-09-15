import { DateTime } from 'luxon'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Generated,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Travel } from '~/features/travels/entities/travel.entity'
import { User } from '~/features/users/entities/user.entity'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'
import { TravelCancelType } from '../enums/travel-cancel-type.enum'

@Entity({ name: 'rides' })
export class Ride {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	@Column({ type: 'varchar' })
	endpoint: string

	@Column({ type: 'boolean', default: false, nullable: false })
	isAccepted: boolean

	@Column({
		type: 'timestamptz',
		transformer: LuxonDateTransformer
	})
	arrivalTime: DateTime

	@Column({ type: 'float', nullable: true })
	starRating: number

	// Passenger Columns

	@Column({ type: 'boolean', default: false, nullable: true })
	tookTheRide: boolean

	@Column({ type: 'varchar', nullable: true })
	meetingPoint: string

	@Column({ nullable: true })
	cancellationReason: string

	@Column({
		type: 'enum',
		enum: TravelCancelType,
		nullable: true
	})
	travelCancelType: TravelCancelType

	@Column()
	passengerStarRating: number

	@Column()
	driverStarRating: number

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

	@ManyToOne(
		() => User,
		(user) => user.rides
	)
	passenger: User

	@ManyToOne(
		() => Travel,
		(travel) => travel.rides
	)
	travel: Travel
}
