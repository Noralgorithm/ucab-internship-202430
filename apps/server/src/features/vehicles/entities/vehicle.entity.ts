import { DateTime } from 'luxon'
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Generated,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Travel } from '~/features/travels/entities/travel.entity'
import { User } from '~/features/users/entities/user.entity'
import {
	BRAND_MAX_LENGTH,
	COLOR_MAX_LENGTH,
	MODEL_MAX_LENGTH,
	PLATE_LENGTH
} from '~/shared/constants'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'

@Entity({ name: 'vehicles' })
@Index(['id', 'deletedAt'], { unique: true })
@Index(['plate', 'deletedAt'], { unique: true })
export class Vehicle {
	@PrimaryGeneratedColumn()
	internalId: number

	@Generated('uuid')
	@Column({ type: 'uuid', unique: true })
	id: string

	@Column({ type: 'varchar', length: PLATE_LENGTH, unique: true })
	plate: string

	@Column({ type: 'varchar', length: BRAND_MAX_LENGTH })
	brand: string

	@Column({ type: 'varchar', length: COLOR_MAX_LENGTH })
	color: string

	@Column({ type: 'varchar', length: MODEL_MAX_LENGTH })
	model: string

	@Column({ type: 'smallint' })
	seatQuantity: number

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
		(user) => user.vehicles,
		{
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}
	)
	driver: User

	@OneToMany(
		() => Travel,
		(travel) => travel.vehicle
	)
	travels: Travel[]
}
