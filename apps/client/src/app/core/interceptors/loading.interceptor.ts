import type { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { finalize } from 'rxjs'
import { LoadingService } from '../components/loading/loading.service'

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
	const loadingService = inject(LoadingService)
	loadingService.show()
	return next(req).pipe(
		finalize(() => {
			loadingService.hide()
		})
	)
}
