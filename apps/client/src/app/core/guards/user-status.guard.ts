import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { catchError, map } from 'rxjs/operators'
import { UserStatusService } from '~/features/user-status/user-status.service'

export const userStatusGuard: CanActivateFn = () => {
	const userStatusService = inject(UserStatusService)
	const router = inject(Router)

	return userStatusService.userStatus().pipe(
		map((res) => {
			if (!res.data.isIn) {
				return true
			}

			const currentRoute = router.url

			if (res.data.payload?.type === 'ride') {
				if (res.data.payload.status === 'in-progress') {
					if (currentRoute !== '/in-ride') {
						router.navigate(['in-ride'], {
							queryParams: { id: res.data.payload.id }
						})
					}
				} else if (res.data.payload.status === 'not-started') {
					if (currentRoute !== '/travel-waiting-room') {
						router.navigate(['travel-waiting-room'], {
							queryParams: { id: res.data.payload.id }
						})
					}
				} else {
					if (currentRoute !== '/app') {
						router.navigate(['app'], {
							queryParams: { id: res.data.payload.id }
						})
					}
				}
			}

			if (res.data.payload?.type === 'travel') {
				if (res.data.payload.status === 'in-progress') {
					if (currentRoute !== '/in-travel') {
						router.navigate(['in-travel'], {
							queryParams: { id: res.data.payload.id }
						})
					}
				} else if (res.data.payload.status === 'not-started') {
					if (currentRoute !== '/app/travel-lobby') {
						router.navigate(['app/travel-lobby'], {
							queryParams: { id: res.data.payload.id }
						})
					}
				} else {
					if (currentRoute !== '/app') {
						router.navigate(['app'], {
							queryParams: { id: res.data.payload.id }
						})
					}
				}
			}

			return false
		}),
		catchError((err) => {
			throw err
		})
	)
}
