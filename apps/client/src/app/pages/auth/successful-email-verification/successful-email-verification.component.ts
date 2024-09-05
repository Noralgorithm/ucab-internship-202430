import { Component } from '@angular/core'
import { LogoComponent } from '../../../shared/ui/components/logo/logo.component'

@Component({
	selector: 'app-successful-email-verification',
	standalone: true,
	imports: [LogoComponent],
	templateUrl: './successful-email-verification.component.html',
	styleUrl: './successful-email-verification.component.css'
})
export class SuccessfulEmailVerificationComponent {}
