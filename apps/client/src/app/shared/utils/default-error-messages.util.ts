import { ValidationErrorMessages } from '../types/validation-error-messages.type'

export const DEFAULT_ERROR_MESSAGES: ValidationErrorMessages = {
	required: 'Este campo es requerido',
	email: 'El correo electrónico es inválido',
	minLength: 'Este campo requiere más caracteres',
	maxLength: 'Este campo requiere menos caracteres'
}
