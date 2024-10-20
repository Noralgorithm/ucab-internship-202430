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
import { User } from '~/features/users/entities/user.entity'
import { RouteType } from '~/shared/constants'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'
import { GeoJsonLineString } from '../types'

@Entity({ name: 'routes' })
export class RouteEntity {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	@Column()
	name: string

	@Column({
		type: 'enum',
		enum: RouteType,
		nullable: false
	})
	type: RouteType

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

	@Column({ type: 'text', nullable: false })
	photoFilename: string

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
		(user) => user.routes
	)
	user: User
}
