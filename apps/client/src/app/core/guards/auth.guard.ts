// import { type CanActivateFn, Router } from '@angular/router'
// import { inject } from '@angular/core'
// import { AuthService } from '../../features/auth/services/auth.service'

// export const authGuard: CanActivateFn = () => {
// 	const authService = inject(AuthService)
// 	const router = inject(Router)
// 	if (authService.isAuth()) {
// 		return true
// 	}
// 	const url = router.createUrlTree(['/login'])
// 	const toast = inject(Toast)
// 	toast.show('error', 'Error', '¡Ups, parece que no has iniciado sesión aún!')
// 	return url
// }
