import type { HttpInterceptorFn } from '@angular/common/http'
import { TOKEN_KEY } from '~/shared/constants'

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
	if (!req.url.startsWith('/')) {
		return next(req)
	}

	const isLocalStorageAvailable = typeof localStorage !== 'undefined'

	if (!isLocalStorageAvailable) {
		return next(req)
	}

	const token = localStorage.getItem(TOKEN_KEY) ?? ''

	const requestWithHeader = req.clone({
		headers: req.headers.set('Authorization', `Bearer ${token}`)
	})

	return next(requestWithHeader)
}
