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
import { Ride } from '~/features/rides/entities/ride.entity'
import { User } from '~/features/users/entities/user.entity'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'

@Entity({ name: 'messages' })
export class Message {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	@Column()
	content: string

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
		() => Ride,
		(ride) => ride.messages
	)
	ride: Ride

	@ManyToOne(
		() => User,
		(user) => user.messages
	)
	sender: User
}
