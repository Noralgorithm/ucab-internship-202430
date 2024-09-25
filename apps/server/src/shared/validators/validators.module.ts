import { Global, Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { getAppDataSource } from '~/typeorm/data-source'
import { ExistsConstraint } from './exists.validator'
import { NotExistsConstraint } from './not-exists.validator'

@Global()
@Module({
	providers: [
		{
			provide: DataSource,
			useFactory: getAppDataSource
		},
		ExistsConstraint,
		NotExistsConstraint
	]
})
export class ValidatorsModule {}
