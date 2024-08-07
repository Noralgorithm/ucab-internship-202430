import {
	type ApplicationConfig,
	provideZoneChangeDetection
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideClientHydration } from '@angular/platform-browser'
import { routes } from './app.routes'
// import { provideHttpClient, withInterceptors } from '@angular/common/http'
// import { authorizationInterceptor } from './interceptors/authorization.interceptor'
// import { loadingInterceptor } from './interceptors/loading.interceptor'

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration()
		// provideHttpClient(
		// 	withInterceptors([authorizationInterceptor, loadingInterceptor])
		// )
	]
}
