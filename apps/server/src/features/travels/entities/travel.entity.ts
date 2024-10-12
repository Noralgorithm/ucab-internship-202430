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
import { GeoJsonLineString } from '~/features/routes/types'
import { Vehicle } from '~/features/vehicles/entities/vehicle.entity'
import { RouteType } from '~/shared/constants'
import { GeoJsonPoint } from '~/shared/types'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'
import { TravelStatus } from '../enums/travel-status.enum'

@Entity({ name: 'travels' })
export class Travel {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	// Route Data
	// Meters
	@Column()
	distance: number

	// Seconds
	@Column()
	duration: string

	@Column()
	description: string

	@Column('jsonb', { nullable: false })
	geoJsonLineString: GeoJsonLineString
	//

	@Column('jsonb')
	origin: GeoJsonPoint

	@Column('jsonb')
	destination: GeoJsonPoint

	@Column({
		type: 'timestamptz',
		transformer: LuxonDateTransformer,
		nullable: true
	})
	departureTime?: DateTime

	@Column({
		type: 'timestamptz',
		transformer: LuxonDateTransformer,
		nullable: true
	})
	arrivalTime?: DateTime

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
