import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
// import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { SignInService } from '../../features/auth/services/sign-in.service'
import { ButtonComponent } from '../../shared/ui/components/button/button.component'
import { LogoIconComponent } from '../../shared/ui/components/logo-icon/logo-icon.component'
import { LogoComponent } from '../../shared/ui/components/logo/logo.component'

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [
		CommonModule,
		// LottieComponent,
		ButtonComponent,
		LogoIconComponent,
		LogoComponent
	],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css'
})
export class AuthComponent {
	// options: AnimationOptions = {
	// 	path: 'assets/lotties/driving-car.json'
	// }

	constructor(
		private readonly router: Router,
		private readonly signInService: SignInService
	) {}

	ngOnInit() {
		this.signInService
			.execute('joseandresrs0407@gmail.com', '123456')
			.subscribe((res) => {})
	}

	goToLogin() {
		this.router.navigate(['/login'])
	}

	goToRegister() {
		this.router.navigate(['/register'])
	}
}
