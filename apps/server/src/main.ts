import fastifyMultipartPlugin from '@fastify/multipart'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { AppModule } from './app/app.module'
import { SuccessfulResponseBuilderInterceptor } from './app/succesful-response-builder/succesful-response-builder.interceptor'
import metadata from './metadata'

const GLOBAL_PIPES = [new ValidationPipe({ whitelist: true, transform: true })]
const GLOBAL_INTERCEPTORS = [new SuccessfulResponseBuilderInterceptor()]

const SWAGGER_TITLE = 'MoviC Backend API'
const SWAGGER_DESCRIPTION = 'API Documentation of MoviC Backend.'
const SWAGGER_VERSION = '1.0'
const SWAGGER_PATH = 'docs'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	)

	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	const configService = app.get(ConfigService)

	await app.register(fastifyMultipartPlugin)

	app.useGlobalPipes(...GLOBAL_PIPES)
	app.useGlobalInterceptors(...GLOBAL_INTERCEPTORS)

	const config = new DocumentBuilder()
		.setTitle(SWAGGER_TITLE)
		.setDescription(SWAGGER_DESCRIPTION)
		.setVersion(SWAGGER_VERSION)
		.addBearerAuth({ type: 'http' })
		.addSecurityRequirements('bearer')
		.build()

	await SwaggerModule.loadPluginMetadata(metadata)
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup(SWAGGER_PATH, app, document, {
		swaggerOptions: {
			docExpansion: 'none'
		},
		jsonDocumentUrl: `${SWAGGER_PATH}/json`,
		yamlDocumentUrl: `${SWAGGER_PATH}/yaml`
	})

	app.enableCors()

	await app.listen(configService.get('SERVER_PORT', '3000'))
}

bootstrap()
