import { DateTime } from 'luxon'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Generated,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Message } from '~/features/messages/entities/message.entity'
import { Travel } from '~/features/travels/entities/travel.entity'
import { User } from '~/features/users/entities/user.entity'
import { GeoJsonPoint } from '~/shared/types'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'
import { TravelCancelType } from '../enums/travel-cancel-type.enum'

@Entity({ name: 'rides' })
export class Ride {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	@Column({ type: 'boolean', default: null, nullable: true })
	isAccepted?: boolean

	@Column({
		type: 'timestamptz',
		transformer: LuxonDateTransformer,
		nullable: true
	})
	arrivalTime?: DateTime

	// Passenger Columns

	@Column({ type: 'jsonb' })
	origin: GeoJsonPoint

	@Column({ type: 'jsonb' })
	destination: GeoJsonPoint

	@Column({ type: 'boolean', default: false })
	tookTheRide: boolean

	@Column({ type: 'jsonb', nullable: true })
	meetingPoint?: GeoJsonPoint

	@Column({ nullable: true })
	cancellationReason?: string

	@Column({
		type: 'enum',
		enum: TravelCancelType,
		nullable: true
	})
	travelCancelType?: TravelCancelType

	@Column({ type: 'float', nullable: true })
	passengerStarRating?: number

	@Column({ type: 'float', nullable: true })
	driverStarRating?: number

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

	@OneToMany(
		() => Message,
		(message) => message.ride
	)
	messages: Message[]
}
