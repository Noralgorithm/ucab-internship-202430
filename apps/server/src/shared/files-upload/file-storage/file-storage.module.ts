import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileStorageService } from './file-storage.service'

@Module({
	providers: [
		{
			provide: FileStorageService,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return new FileStorageService(
					configService.get('LOCAL_FILE_STORAGE_PATH') ?? './uploads'
				)
			}
		}
	],
	exports: [FileStorageService]
})
export class FileStorageModule {}
