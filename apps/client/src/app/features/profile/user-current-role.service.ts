import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { CURRENT_ROLE_KEY } from '~/shared/constants'
import { UserRole } from '~/shared/types/users/user-role.type'

@Injectable({
	providedIn: 'root'
})
export class UserCurrentRoleService {
	// TODO: Implement AfterNextRender
	constructor() {
		const userCurrentRole: UserRole = (localStorage.getItem(CURRENT_ROLE_KEY) ??
			'passenger') as UserRole

		this.setCurrentRole(userCurrentRole)
	}
	public currentRole$ = new BehaviorSubject<UserRole>('passenger')

	setCurrentRole(role: UserRole) {
		localStorage.setItem(CURRENT_ROLE_KEY, role)
		this.currentRole$.next(role)
	}
}
