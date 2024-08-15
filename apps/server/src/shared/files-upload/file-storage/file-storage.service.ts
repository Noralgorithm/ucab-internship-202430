import { randomUUID } from 'node:crypto'
import * as fs from 'node:fs'
import { join } from 'node:path'
import { Injectable } from '@nestjs/common'
import { getExtension, getMIMEType } from 'node-mime-types'
import { InMemoryFile } from '../in-memory-file.type'

@Injectable()
export class FileStorageService {
	constructor(public dirPath: string) {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath)
		}
	}

	get(filename: string): InMemoryFile {
		const buffer = fs.readFileSync(join(this.dirPath, filename))

		const mimetype = getMIMEType(filename)

		return {
			buffer,
			mimetype: mimetype || 'application/octet-stream',
			size: buffer.length * buffer.BYTES_PER_ELEMENT
		}
	}

	save(file: InMemoryFile): string {
		const fileId = randomUUID()

		const extensions = getExtension(file.mimetype)

		const extensionToUse = Array.isArray(extensions)
			? extensions[0]
			: extensions

		const filename = `${fileId}${extensionToUse}`

		fs.writeFileSync(
			join(this.dirPath, `${fileId}${extensionToUse}`),
			file.buffer
		)

		return filename
	}

	delete(filename: string): void {
		fs.unlinkSync(join(this.dirPath, filename))
	}
}

//TODO(maybe, low priority): add typings for node-mime-types via declaration file
//TODO(maybe, low priority): use node:fs/promises instead of node:fs
