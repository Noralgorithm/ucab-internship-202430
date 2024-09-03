import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { BACKEND_BASE_URL } from '../../config'

export function BaseUrlInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
	const apiReq = req.clone({ url: `${BACKEND_BASE_URL}${req.url}` })
	return next(apiReq)
}
