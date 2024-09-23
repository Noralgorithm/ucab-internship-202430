import {
	provideHttpClient,
	withFetch,
	withInterceptors
} from '@angular/common/http'
import {
	type ApplicationConfig,
	provideZoneChangeDetection
} from '@angular/core'
import { provideClientHydration } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import player from 'lottie-web'
import { provideLottieOptions } from 'ngx-lottie'
import { provideToastr } from 'ngx-toastr'
import { routes } from './app.routes'
import { authorizationInterceptor } from './interceptors/authorization.interceptor'
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor'
import { loadingInterceptor } from './interceptors/loading.interceptor'

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
		provideAnimationsAsync(),
		provideToastr(),
		provideLottieOptions({
			player: () => player
		}),
		provideHttpClient(
			withFetch(),
			withInterceptors([
				loadingInterceptor,
				BaseUrlInterceptor,
				authorizationInterceptor
			])
		)
	]
}
