import type { Routes } from '@angular/router'
import { AddDestinationComponent } from '~/pages/add-destination/add-destination.component'
import { AddVehicleComponent } from '~/pages/add-vehicle/add-vehicle.component'
import { AuthComponent } from '~/pages/auth/auth.component'
import { EmailVerificationComponent } from '~/pages/auth/email-verification/email-verification.component'
import { LoginComponent } from '~/pages/auth/login/login.component'
import { RegisterComponent } from '~/pages/auth/register/register.component'
import { SuccessfulEmailVerificationComponent } from '~/pages/auth/successful-email-verification/successful-email-verification.component'
import { AvailableDriversComponent } from '~/pages/available-drivers/available-drivers.component'
import { EditProfileComponent } from '~/pages/edit-profile/edit-profile.component'
import { EditVehicleComponent } from '~/pages/edit-vehicle/edit-vehicle.component'
import { HomeComponent } from '~/pages/home/home.component'
import { MovipanasComponent } from '~/pages/movipanas/movipanas.component'
import { MyDestinationsComponent } from '~/pages/my-destinations/my-destinations.component'
import { MyVehiclesComponent } from '~/pages/my-vehicles/my-vehicles.component'
import { OfferTravelComponent } from '~/pages/offer-travel/offer-travel.component'
import { ProfileComponent } from '~/pages/profile/profile.component'
import { RouteSelectionComponent } from '~/pages/route-selection/route-selection.component'
import { TravelTypeSelectionComponent } from '~/pages/travel-type-selection/travel-type-selection.component'
import { ViewTravelsComponent } from '~/pages/view-travels/view-travels.component'
import { WaitingForReviewComponent } from '~/pages/waiting-for-review/waiting-for-review.component'
import { TabBarLayoutComponent } from './components/tab-bar/tab-bar-layout/tab-bar-layout.component'

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
		path: 'r',
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
				title: 'Perfil',
				component: ProfileComponent
			},
			{
				path: 'profile/edit',
				title: 'Editar perfil',
				component: EditProfileComponent
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
			},
			{
				path: 'my-destination/add',
				title: 'Agregar destino',
				component: AddDestinationComponent
			},
			{
				path: 'my-vehicles',
				title: 'Mis vehículos',
				component: MyVehiclesComponent
			},
			{
				path: 'my-vehicle/edit',
				title: 'Editar vehículo',
				component: EditVehicleComponent
			},
			{
				path: 'my-vehicle/add',
				title: 'Agregar vehículo',
				component: AddVehicleComponent
			},
			{
				path: 'offer-travel',
				title: 'Crear viaje',
				component: OfferTravelComponent
			},
			{
				path: 'view-travels',
				title: 'Ver viajes',
				component: ViewTravelsComponent
			},
			{
				path: 'travel-type-selection',
				title: 'Seleccionar tipo de viaje',
				component: TravelTypeSelectionComponent
			},
			{
				path: 'available-drivers',
				title: 'Conductores disponibles',
				component: AvailableDriversComponent
			},
			{
				path: 'waiting-for-review',
				title: 'Esperando revisión',
				component: WaitingForReviewComponent
			},
			{
				path: 'route-selection',
				title: 'Seleccionar ruta',
				component: RouteSelectionComponent
			}
		]
	}
]
