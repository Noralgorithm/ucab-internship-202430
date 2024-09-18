import { Component } from '@angular/core'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { LogoComponent } from '~/shared/ui/components/logo/logo.component'

@Component({
	selector: 'app-successful-email-verification',
	standalone: true,
	imports: [LogoComponent, LottieComponent],
	templateUrl: './successful-email-verification.component.html',
	styleUrl: './successful-email-verification.component.css'
})
export class SuccessfulEmailVerificationComponent {
	options: AnimationOptions = {
		path: 'assets/lotties/email-sent.json'
	}
}
