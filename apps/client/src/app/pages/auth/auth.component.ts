import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [LottieComponent],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css'
})
export class AuthComponent {
	options: AnimationOptions = {
		path: 'assets/lotties/driving-car.json'
	}

	constructor(private router: Router) {}

	goToLogin() {
		this.router.navigate(['/login'])
	}

	goToRegister() {
		this.router.navigate(['/register'])
	}
}
