import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app/app.module'

const GLOBAL_PIPES = [new ValidationPipe({ whitelist: true, transform: true })]

const SWAGGER_TITLE = 'MoviC Backend API'
const SWAGGER_DESCRIPTION = 'API Documentation of MoviC Backend'
const SWAGGER_VERSION = '1.0'
const SWAGGER_PATH = 'docs'

const SERVER_PORT = 3000

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	)

	app.useGlobalPipes(...GLOBAL_PIPES)

	const config = new DocumentBuilder()
		.setTitle(SWAGGER_TITLE)
		.setDescription(SWAGGER_DESCRIPTION)
		.setVersion(SWAGGER_VERSION)
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup(SWAGGER_PATH, app, document)

	await app.listen(SERVER_PORT)
}
bootstrap()
