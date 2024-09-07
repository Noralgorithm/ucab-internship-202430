const IS_UCAB_STUDENT_EMAIL_REGEX = /@(est)/

export function isUcabStudentEmail(email: string): boolean {
	return IS_UCAB_STUDENT_EMAIL_REGEX.test(email)
}
