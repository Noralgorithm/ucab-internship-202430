import type { Routes } from '@angular/router'
import { AuthComponent } from '~/pages/auth/auth.component'
import { EmailVerificationComponent } from '~/pages/auth/email-verification/email-verification.component'
import { LoginComponent } from '~/pages/auth/login/login.component'
import { RegisterComponent } from '~/pages/auth/register/register.component'
import { SuccessfulEmailVerificationComponent } from '~/pages/auth/successful-email-verification/successful-email-verification.component'
import { HomeComponent } from '~/pages/home/home.component'
import { MovipanasComponent } from '~/pages/movipanas/movipanas.component'
import { MyDestinationsComponent } from '~/pages/my-destinations/my-destinations.component'
import { ProfileComponent } from '~/pages/profile/profile.component'
import { TabBarLayoutComponent } from './components/tab-bar-layout/tab-bar-layout.component'

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
	},
	{
		path: 'email-verification',
		title: 'Verificación de correo electrónico',
		component: EmailVerificationComponent
	},
	{
		path: 'email-verification/success',
		title: 'Correo enviado con éxito',
		component: SuccessfulEmailVerificationComponent
	},
	{
		path: 'app',
		component: TabBarLayoutComponent,
		children: [
			{
				path: '',
				title: 'Inicio',
				component: HomeComponent
			},
			{
				path: 'profile',
				component: ProfileComponent
			},
			{
				path: 'movipanas',
				title: 'MoviPanas',
				component: MovipanasComponent
			},
			{
				path: 'my-destinations',
				title: 'Mis destinos',
				component: MyDestinationsComponent
			}
		]
	}
]
