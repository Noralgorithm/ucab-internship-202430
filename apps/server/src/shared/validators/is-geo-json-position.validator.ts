import {
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator
} from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsGeoJsonPositionConstraint
	implements ValidatorConstraintInterface
{
	validate(value: unknown): boolean {
		if (!Array.isArray(value)) {
			return false
		}

		if (![2, 3].includes(value.length)) {
			return false
		}

		const [longitude, latitude, altitude] = value as unknown[]

		return (
			typeof longitude === 'number' &&
			typeof latitude === 'number' &&
			(typeof altitude === 'number' || altitude == null) &&
			longitude >= -180 &&
			longitude <= 180 &&
			latitude >= -90 &&
			latitude <= 90
		)
	}

	defaultMessage(): string {
		return 'Position must be a valid GeoJSON position array ([longitude, latitude] or [longitude, latitude, altitude])'
	}
}

export function IsGeoJsonPosition(validationOptions?: ValidationOptions) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsGeoJsonPositionConstraint
		})
	}
}

//TODO: add tests
