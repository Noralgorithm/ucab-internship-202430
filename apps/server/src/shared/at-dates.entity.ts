import { DateTime } from 'luxon'
import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class AtDates {
	@CreateDateColumn({ type: 'timestamp' })
	createdAt: DateTime

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: DateTime
}
