import { AbstractControl, ValidatorFn } from '@angular/forms'

export const passwordsMatchValidator: ValidatorFn = (
	control: AbstractControl
) => {
	const password = control.get('password')
	const confirmPassword = control.get('confirmPassword')

	if (!password || !confirmPassword) return null

	return password.value === confirmPassword.value
		? null
		: { passwordsMatch: true }
}
