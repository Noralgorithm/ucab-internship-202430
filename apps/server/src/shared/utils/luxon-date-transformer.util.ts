import { DateTime } from 'luxon'

export const LuxonDateTransformer = {
	to(value: DateTime | undefined): string | null | undefined {
		return value?.toISO()
	},

	from(value: Date | null): DateTime | null {
		if (value == null) {
			return null
		}
		return DateTime.fromJSDate(value)
	}
}
