import { DateTime } from 'luxon'

export const LuxonDateTransformer = {
	to(value: DateTime | undefined): string | null | undefined {
		return value?.toISO()
	},

	from(value: Date): DateTime {
		return DateTime.fromJSDate(value)
	}
}
