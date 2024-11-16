export function generateEmergencyLink(
	emergencyNumber: string,
	vehiclePlate: string,
	lat: string,
	lng: string
) {
	const numberWithCountryCode = `+58${emergencyNumber}`
	const currentLocation = `https://maps.google.com/?q=${lat},${lng}`
	return `sms://${numberWithCountryCode}?&body=Hola. Estoy en una situación de emergencia. Placa del vehículo: ${vehiclePlate}. Link de la ubicación: ${currentLocation}`
}
