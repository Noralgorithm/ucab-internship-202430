import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { PREFERRED_ROLE_KEY } from '~/shared/constants'
import { UserRole } from '~/shared/types/users/user-role.type'

@Injectable({
	providedIn: 'root'
})
export class UserCurrentRoleService {
	// TODO: Implement AfterNextRender
	constructor() {
		const userPreferredRole: UserRole = (localStorage.getItem(
			PREFERRED_ROLE_KEY
		) ?? 'passenger') as UserRole

		this.setCurrentRole(userPreferredRole)
	}
	public currentRole$ = new BehaviorSubject<UserRole>('passenger')

	setCurrentRole(role: UserRole) {
		this.currentRole$.next(role)
	}
}
