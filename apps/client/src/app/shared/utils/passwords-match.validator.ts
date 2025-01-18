import { AbstractControl, ValidatorFn } from '@angular/forms'

export const passwordsMatchValidator: ValidatorFn = (
	control: AbstractControl
) => {
	const password = control.get('password')
	const confirmPassword = control.get('confirmPassword')

	if (!password || !confirmPassword) return null

	const passwordsMatch = password.value === confirmPassword.value

	if (!passwordsMatch) {
		confirmPassword.setErrors({ notMatchingPassword: true })
	} else {
		confirmPassword.setErrors(null)
	}

	return passwordsMatch ? null : { notMatchingPassword: true }
}
