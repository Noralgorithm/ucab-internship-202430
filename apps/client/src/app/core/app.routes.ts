import type { Routes } from '@angular/router'
import { AuthComponent } from '../pages/auth/auth.component'
import { LoginComponent } from '../pages/auth/login/login.component'
import { RegisterComponent } from '../pages/auth/register/register.component'

export const routes: Routes = [
	{
		path: '',
		title: 'MoviC',
		component: AuthComponent
	},
	{
		path: 'login',
		title: 'Iniciar sesión',
		component: LoginComponent
	},
	{
		path: 'register',
		title: 'Registrarse',
		component: RegisterComponent
	}
]
