import { IsString, IsUUID } from 'class-validator'
import { Exists } from '~/shared/validators/exists.validator'
import { Travel } from '../entities/travel.entity'

export class StartDto {
	@Exists({ entity: Travel, key: 'id', message: 'Travel does not exist' })
	@IsUUID('4')
	@IsString()
	travelId: Travel['id']
}
