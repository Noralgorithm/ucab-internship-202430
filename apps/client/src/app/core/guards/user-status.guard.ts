import { CanActivateFn } from '@angular/router'

export const userStatusGuard: CanActivateFn = (route, state) => {
	return true
}
