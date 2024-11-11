export function generateEmergencyLink(emergencyNumber: string) {
	const numberWithCountryCode = `+58${emergencyNumber}`
	return `sms://${numberWithCountryCode}?&body=Este es un mensaje de emergencia el cual fué enviado bajo la aplicación MoviC`
}
