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

@Entity({ name: 'routes' })
export class Route {
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

	@Column()
	route: string

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
