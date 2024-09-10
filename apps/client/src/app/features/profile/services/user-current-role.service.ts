import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UserRole } from '~/shared/types/users/user-role.type'

@Injectable({
	providedIn: 'root'
})
export class UserCurrentRoleService {
	public currentRole$ = new BehaviorSubject<UserRole>('passenger')

	setCurrentRole(role: UserRole) {
		this.currentRole$.next(role)
	}
}
