import { ValidationErrorMessages } from '~/shared/types/validation-error-messages.type'

export const DEFAULT_ERROR_MESSAGES: ValidationErrorMessages = {
	required: 'Este campo es requerido',
	email: 'El correo electrónico es inválido',
	minlength: 'Este campo requiere más caracteres',
	maxlength: 'Este campo requiere menos caracteres'
}
