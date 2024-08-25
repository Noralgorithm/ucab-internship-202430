import { DateTime } from 'luxon'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { EMAIL_MAX_LENGTH } from '~/shared/constants'
import { LuxonDateTransformer } from '~/shared/utils/luxon-date-transformer.util'

@Entity()
export class SignUpRequest {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ length: EMAIL_MAX_LENGTH, unique: true })
	email: string

	@Column({ type: 'timestamp' })
	expirationDate: DateTime

	@CreateDateColumn({
		type: 'timestamp',
		transformer: LuxonDateTransformer
	})
	createdAt: DateTime

	@UpdateDateColumn({
		type: 'timestamp',
		transformer: LuxonDateTransformer
	})
	updatedAt: DateTime
}
