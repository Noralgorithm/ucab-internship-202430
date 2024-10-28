import { IsOptional, IsString, IsUUID } from 'class-validator'
import { Exists } from '~/shared/validators/exists.validator'
import { Travel } from '../entities/travel.entity'

export class CancelDto {
	@Exists({ entity: Travel, key: 'id', message: 'Travel does not exist' })
	@IsUUID('4')
	@IsString()
	travelId: Travel['id']

	@IsString()
	@IsOptional()
	reason?: string
}
