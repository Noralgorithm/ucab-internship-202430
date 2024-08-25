import { DateTime } from 'luxon'

export const LuxonDateTransformer = {
	to(value: DateTime): Date {
		return value.toJSDate()
	},

	from(value: Date): DateTime {
		return DateTime.fromJSDate(value)
	}
}
