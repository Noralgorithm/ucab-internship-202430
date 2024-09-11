type NonNullableProperties<T> = {
	[K in keyof T]: NonNullable<T[K]>
}

export function removeNullProperties<T>(obj: object) {
	return Object.keys(obj)
		.filter((key) => obj[key as keyof typeof obj] !== null)
		.reduce((acc, key) => {
			acc[key as keyof typeof acc] = obj[key as keyof typeof obj]
			return acc
		}, {}) as NonNullableProperties<T>
}
