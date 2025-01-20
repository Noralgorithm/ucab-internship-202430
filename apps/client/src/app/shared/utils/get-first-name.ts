export function getFirstName(fullName: string) {
	const fullNameWithoutSpaces = fullName.trim()

	const names = fullNameWithoutSpaces.split(/\s+/)

	return names[0]
}
