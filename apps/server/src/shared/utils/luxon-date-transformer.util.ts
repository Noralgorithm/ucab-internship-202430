import { DateTime } from 'luxon'

export const LuxonDateTransformer = {
	to(value: DateTime | undefined): string | undefined {
		return value?.toJSDate().toISOString()
	},

	from(value: Date): DateTime {
		return DateTime.fromJSDate(value)
	}
}
