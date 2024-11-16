import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator
} from 'class-validator'
import {
	DataSource,
	EntityMetadataNotFoundError,
	EntityPropertyNotFoundError,
	QueryFailedError
} from 'typeorm'
import { UnknownError } from '../errors'
import { Class } from '../types'

/**
 * Use NotExists decorator instead
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class NotExistsConstraint implements ValidatorConstraintInterface {
	constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

	async validate(
		value: string,
		validationArguments: ValidationArguments
	): Promise<boolean> {
		const { constraints, targetName, property } = validationArguments

		//TODO: do not infer the type of constraints, make it explicit via a type guard
		let [entity, key]: [(string | Class<unknown>)?, string?] = constraints as [
			Class<unknown>?,
			string?
		]

		entity ??= targetName
		key ??= property

		try {
			const repository = this.dataSource.getRepository(entity)

			const exists = await repository.existsBy({ [key]: value })

			return !exists
		} catch (error: unknown) {
			if (!(error instanceof Error)) {
				throw new UnknownError(
					'Something unexpected occurred while using the repository',
					{ cause: error }
				)
			}

			if (error instanceof EntityMetadataNotFoundError) {
				throw new TypeError(`Entity ${entity} not found`, { cause: error })
			}

			if (error instanceof EntityPropertyNotFoundError) {
				throw new TypeError(`Property ${key} not found in entity ${entity}`, {
					cause: error
				})
			}

			//TODO: should be handled in a different way depending of arguments and other validators applied
			//* This was added because of a case in which validating that smt is an UUID and then querying using this validator in some field which is also an UUID resulted in a QueryFailedError because previous validator failed and this nevertheless followed
			if (error instanceof QueryFailedError) {
				console.error(error)
				return false
			}

			throw new Error('An error occurred while using the repository', {
				cause: error
			})
		}
	}

	defaultMessage(validationArguments: ValidationArguments): string {
		return `${validationArguments.property} of ${validationArguments.targetName} with value ${validationArguments.value} found`
	}
}

interface NotExistsParams<T> {
	entity?: Class<T>
	key?: keyof InstanceType<Class<T>>
}

export function NotExists<T>(params?: NotExistsParams<T> & ValidationOptions) {
	return (object: object, propertyName: string) => {
		const { entity, key, ...options } = params ?? {}

		registerDecorator({
			target: object.constructor,
			propertyName,
			options,
			constraints: [entity, key],
			validator: NotExistsConstraint
		})
	}
}

//TODO: add tests
