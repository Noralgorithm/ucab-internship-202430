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
import { Destination, Origin } from '../strategies/types'

@Entity({ name: 'travel_distance_matrix_per_passengers' })
export class TravelDistanceMatrixPerPassenger {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	@Column('jsonb')
	origin: Origin

	@Column('jsonb')
	destination: Destination

	@Column({ type: 'float' })
	distance: number

	@Column({ type: 'text' })
	duration: string

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
		() => Travel,
		(travel) => travel.travelDistanceMatrixPerPassengers
	)
	travel: Travel

	@ManyToOne(
		() => User,
		(user) => user.travelDistanceMatrixPerPassengers
	)
	passenger: User
}
