export function getFirstLastName(fullLastName: string) {
	const fullLastNameWithoutSpaces = fullLastName.trim()

	const lastName = fullLastNameWithoutSpaces.split(/\s+/)

	return lastName[0]
}
