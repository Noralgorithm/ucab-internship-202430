import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { Observable, map } from 'rxjs'
import { constructHttpResponse } from '~/shared/http-response/construct-http-response.util'
import { HttpResponse } from '~/shared/http-response/http-response.type'

@Injectable()
export class SuccessfulResponseBuilderInterceptor
	implements NestInterceptor<unknown, HttpResponse<unknown>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler<unknown>
	): Observable<HttpResponse<unknown>> {
		const response = context.switchToHttp().getResponse<FastifyReply>()

		const statusCode = response.statusCode

		return next
			.handle()
			.pipe(map((data) => constructHttpResponse(statusCode, data)))
	}
}
