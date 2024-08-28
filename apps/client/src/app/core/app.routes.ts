import type { Routes } from '@angular/router'
import { AuthComponent } from '../pages/auth/auth.component'
import { LoginComponent } from '../pages/auth/login/login.component'
import { RegisterComponent } from '../pages/auth/register/register.component'
import { ComponentPlaygroundComponent } from '../pages/component-playground/component-playground.component'

export const routes: Routes = [
	{
		path: 'playground',
		title: 'Playground',
		component: ComponentPlaygroundComponent
	},
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
