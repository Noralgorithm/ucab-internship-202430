import { DateTime } from 'luxon'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AtDates } from '~/shared/at-dates.entity'
import { EMAIL_MAX_LENGTH } from '~/shared/constants'

@Entity()
export class SignUpRequest {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ length: EMAIL_MAX_LENGTH, unique: true })
	email: string

	@Column({ type: 'timestamp' })
	expirationDate: DateTime

	@Column(() => AtDates, { prefix: false })
	atDates: AtDates
}
