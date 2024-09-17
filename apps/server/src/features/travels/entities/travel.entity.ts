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
import { Ride } from '~/features/rides/entities/ride.entity'
import { Vehicle } from '~/features/vehicles/entities/vehicle.entity'
import { RouteType } from '~/shared/constants'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'
import { TravelStatus } from '../enums/travel-status.enum'

@Entity({ name: 'vehicles' })
export class Travel {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	@Column({ type: 'varchar' })
	route: string

	@Column({ type: 'varchar' })
	endpoint: string

	@Column({
		type: 'timestamptz',
		transformer: LuxonDateTransformer
	})
	departureTime: DateTime

	@Column({
		type: 'timestamptz',
		transformer: LuxonDateTransformer
	})
	arrivalTime: DateTime

	@Column({ type: 'boolean', default: false, nullable: false })
	forWomen: boolean

	@Column({
		type: 'enum',
		enum: RouteType,
		default: RouteType.FROM_UCAB,
		nullable: false
	})
	type: RouteType

	@Column({
		type: 'enum',
		enum: TravelStatus,
		default: TravelStatus.NOT_STARTED,
		nullable: false
	})
	status: TravelStatus

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
		() => Vehicle,
		(vehicle) => vehicle.travels
	)
	vehicle: Vehicle

	@Column({ type: 'smallint', nullable: false })
	availableSeatQuantity: number

	@OneToMany(
		() => Ride,
		(ride) => ride.travel
	)
	rides: Ride[]
}
