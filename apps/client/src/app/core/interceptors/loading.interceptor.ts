import { HttpContextToken, type HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { finalize } from 'rxjs'
import { LoadingService } from '../components/loading/loading.service'

export const BYPASS_LOADING = new HttpContextToken(() => false)

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
	if (req.context.get(BYPASS_LOADING)) {
		return next(req)
	}

	const loadingService = inject(LoadingService)
	loadingService.show()
	return next(req).pipe(
		finalize(() => {
			loadingService.hide()
		})
	)
}
