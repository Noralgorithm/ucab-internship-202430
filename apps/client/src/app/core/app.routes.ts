import type { Routes } from '@angular/router'
import { AddDestinationComponent } from '~/pages/add-destination/add-destination.component'
import { AddVehicleComponent } from '~/pages/add-vehicle/add-vehicle.component'
import { AuthComponent } from '~/pages/auth/auth.component'
import { EmailVerificationComponent } from '~/pages/auth/email-verification/email-verification.component'
import { LoginComponent } from '~/pages/auth/login/login.component'
import { RegisterComponent } from '~/pages/auth/register/register.component'
import { SuccessfulEmailVerificationComponent } from '~/pages/auth/successful-email-verification/successful-email-verification.component'
import { AvailableDriversComponent } from '~/pages/available-drivers/available-drivers.component'
import { ChatComponent } from '~/pages/chat/chat.component'
import { ConfirmTravelComponent } from '~/pages/confirm-travel/confirm-travel.component'
import { EditProfileComponent } from '~/pages/edit-profile/edit-profile.component'
import { EditVehicleComponent } from '~/pages/edit-vehicle/edit-vehicle.component'
import { ExternalDestinationSelectionComponent } from '~/pages/external-destination-selection/external-destination-selection.component'
import { HomeComponent } from '~/pages/home/home.component'
import { InRideComponent } from '~/pages/in-ride/in-ride.component'
import { InTravelComponent } from '~/pages/in-travel/in-travel.component'
import { MovipanasComponent } from '~/pages/movipanas/movipanas.component'
import { MyDestinationsComponent } from '~/pages/my-destinations/my-destinations.component'
import { MyVehiclesComponent } from '~/pages/my-vehicles/my-vehicles.component'
import { OfferTravelComponent } from '~/pages/offer-travel/offer-travel.component'
import { ProfileComponent } from '~/pages/profile/profile.component'
import { RatingDriverComponent } from '~/pages/rating-driver/rating-driver.component'
import { RatingPassengersComponent } from '~/pages/rating-passengers/rating-passengers.component'
import { RideDestinationSelectionComponent } from '~/pages/ride-destination-selection/ride-destination-selection.component'
import { RouteFromUcabSelectionComponent } from '~/pages/route-from-ucab-selection/route-from-ucab-selection.component'
import { RouteSelectionComponent } from '~/pages/route-to-ucab-selection/route-to-ucab-selection.component'
import { SeeDestinationComponent } from '~/pages/see-destination/see-destination.component'
import { TravelLobbyComponent } from '~/pages/travel-lobby/travel-lobby.component'
import { TravelTypeSelectionComponent } from '~/pages/travel-type-selection/travel-type-selection.component'
import { TravelWaitingRoomComponent } from '~/pages/travel-waiting-room/travel-waiting-room.component'
import { WaitingForReviewComponent } from '~/pages/waiting-for-review/waiting-for-review.component'
import { TabBarLayoutComponent } from './components/tab-bar/tab-bar-layout/tab-bar-layout.component'
import { userStatusGuard } from './guards/user-status.guard'

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
		path: 'chat',
		title: 'Chat',
		component: ChatComponent
	},
	{
		path: 'in-ride',
		title: 'En cola',
		component: InRideComponent
	},
	{
		path: 'in-travel',
		title: 'En viaje',
		component: InTravelComponent
	},
	{
		path: 'rating-driver',
		title: 'Calificar conductor',
		component: RatingDriverComponent
	},
	{
		path: 'rating-passengers',
		title: 'Calificar pasajeros',
		component: RatingPassengersComponent
	},
	{
		path: 'app',
		component: TabBarLayoutComponent,
		children: [
			{
				path: '',
				title: 'Inicio',
				// canActivate: [userStatusGuard],
				component: HomeComponent
			},
			{
				path: 'profile',
				title: 'Perfil',
				canActivate: [userStatusGuard],
				component: ProfileComponent
			},
			{
				path: 'profile/edit',
				title: 'Editar perfil',
				canActivate: [userStatusGuard],
				component: EditProfileComponent
			},
			{
				path: 'movipanas',
				title: 'MoviPanas',
				canActivate: [userStatusGuard],
				component: MovipanasComponent
			},
			{
				path: 'my-destinations',
				title: 'Mis destinos',
				canActivate: [userStatusGuard],
				component: MyDestinationsComponent
			},
			{
				path: 'my-destination/add',
				title: 'Agregar destino',
				canActivate: [userStatusGuard],
				component: AddDestinationComponent
			},
			{
				path: 'my-vehicles',
				title: 'Mis vehículos',
				canActivate: [userStatusGuard],
				component: MyVehiclesComponent
			},
			{
				path: 'my-vehicle/edit',
				title: 'Editar vehículo',
				canActivate: [userStatusGuard],
				component: EditVehicleComponent
			},
			{
				path: 'my-vehicle/add',
				title: 'Agregar vehículo',
				canActivate: [userStatusGuard],
				component: AddVehicleComponent
			},
			{
				path: 'offer-travel',
				title: 'Crear viaje',
				canActivate: [userStatusGuard],
				component: OfferTravelComponent
			},
			{
				path: 'travel-type-selection',
				title: 'Seleccionar tipo de viaje',
				canActivate: [userStatusGuard],
				component: TravelTypeSelectionComponent
			},
			{
				path: 'available-drivers',
				title: 'Conductores disponibles',
				canActivate: [userStatusGuard],
				component: AvailableDriversComponent
			},
			{
				path: 'waiting-for-review',
				title: 'Esperando revisión',
				canActivate: [userStatusGuard],
				component: WaitingForReviewComponent
			},
			{
				path: 'route-to-ucab-selection',
				title: 'Seleccionar ruta',
				canActivate: [userStatusGuard],
				component: RouteSelectionComponent
			},
			{
				path: 'confirm-travel',
				title: 'Confirmar viaje',
				canActivate: [userStatusGuard],
				component: ConfirmTravelComponent
			},
			{
				path: 'external-destination-selection',
				title: 'Seleccionar destino externo',
				canActivate: [userStatusGuard],
				component: ExternalDestinationSelectionComponent
			},
			{
				path: 'route-from-ucab-selection',
				title: 'Seleccionar ruta desde UCAB',
				canActivate: [userStatusGuard],
				component: RouteFromUcabSelectionComponent
			},
			{
				path: 'ride-destination-selection',
				title: 'Seleccionar destino externo',
				canActivate: [userStatusGuard],
				component: RideDestinationSelectionComponent
			},
			{
				path: 'travel-lobby',
				title: 'Sala de viaje',
				component: TravelLobbyComponent
			},
			{
				path: 'travel-waiting-room',
				title: 'Información del viaje',
				component: TravelWaitingRoomComponent
			},
			{
				path: 'see-destination',
				title: 'Mi Destino',
				canActivate: [userStatusGuard],
				component: SeeDestinationComponent
			}
		]
	}
]
