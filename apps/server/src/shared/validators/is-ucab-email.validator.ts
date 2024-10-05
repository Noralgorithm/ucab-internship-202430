import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	isEmail,
	matches,
	registerDecorator
} from 'class-validator'
import { UCAB_EMAIL_REGEX } from '../constants'

@ValidatorConstraint({ async: false })
export class IsUcabEmailConstraint implements ValidatorConstraintInterface {
	validate(value: unknown, validationArguments: ValidationArguments): boolean {
		const { constraints } = validationArguments

		const options: validator.IsEmailOptions = {
			allow_display_name: constraints[0],
			allow_ip_domain: constraints[1],
			allow_utf8_local_part: constraints[2],
			blacklisted_chars: constraints[3],
			domain_specific_validation: constraints[4],
			host_blacklist: constraints[5],
			host_whitelist: constraints[6],
			ignore_max_length: constraints[7],
			require_display_name: constraints[8],
			require_tld: constraints[9]
		}

		return (
			typeof value === 'string' &&
			isEmail(value, options) &&
			matches(value, UCAB_EMAIL_REGEX)
		)
	}

	defaultMessage(): string {
		return '$property must be a valid UCAB email address'
	}
}

export function IsUcabEmail(
	options?: validator.IsEmailOptions,
	validationOptions?: ValidationOptions
) {
	return (object: object, propertyName: string) => {
		const {
			allow_display_name,
			allow_ip_domain,
			allow_utf8_local_part,
			blacklisted_chars,
			domain_specific_validation,
			host_blacklist,
			host_whitelist,
			ignore_max_length,
			require_display_name,
			require_tld
		} = options ?? {}

		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [
				allow_display_name,
				allow_ip_domain,
				allow_utf8_local_part,
				blacklisted_chars,
				domain_specific_validation,
				host_blacklist,
				host_whitelist,
				ignore_max_length,
				require_display_name,
				require_tld
			],
			validator: IsUcabEmailConstraint
		})
	}
}

//TODO: add tests
