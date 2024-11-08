export function generateEmergencyLink(emergencyNumber: string) {
	return `sms://${emergencyNumber}?&body=Este es un mensaje de emergencia el cual fué enviado bajo la aplicación MoviC`
}
