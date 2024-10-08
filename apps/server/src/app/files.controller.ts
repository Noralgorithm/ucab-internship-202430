import { Controller, Get, Param, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FastifyReply } from 'fastify'
import { Public } from '~/features/auth/decorators/public.decorator'
import { FileStorageService } from '~/shared/files-upload/file-storage/file-storage.service'

@ApiTags('files')
@Controller('files')
export class FilesController {
	constructor(private readonly fileStorageService: FileStorageService) {}

	@Public()
	@Get(':filename')
	retrieveFile(@Param('filename') filename: string, @Res() res: FastifyReply) {
		const file = this.fileStorageService.get(filename)

		res.headers({
			'Content-Type': file.mimetype,
			'Content-Length': file.size
		})

		res.send(file.buffer)
	}
}
