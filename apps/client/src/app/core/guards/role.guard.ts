// import { type CanActivateFn, Router } from '@angular/router'
// import { inject } from '@angular/core'
// import {
// 	AuthService,
// 	type RoleType
// } from '../../features/auth/services/auth.service'

// export const roleGuard =
// 	(roles: RoleType[]): CanActivateFn =>
// 	() => {
// 		const authService = inject(AuthService)
// 		const router = inject(Router)
// 		if (authService.isRole(roles)) {
// 			return true
// 		}
// 		const url = router.createUrlTree(['/unauthorized'])
// 		return url
// 	}
