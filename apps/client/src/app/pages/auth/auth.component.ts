import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { LogoComponent } from '~/shared/ui/components/logo/logo.component'

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [CommonModule, LottieComponent, ButtonComponent, LogoComponent],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css'
})
export class AuthComponent {
	options: AnimationOptions = {
		path: 'assets/lotties/driving-car.json'
	}

	constructor(private readonly router: Router) {}

	goToLogin() {
		this.router.navigate(['/login'])
	}

	goToRegister() {
		this.router.navigate(['/email-verification'])
	}
}
