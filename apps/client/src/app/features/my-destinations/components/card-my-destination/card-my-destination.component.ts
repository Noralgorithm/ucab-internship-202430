import { Component, Input } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Destination } from '~/shared/types/maps/destination'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { GOOGLE_MAPS_API_KEY } from '~root/secrets'

@Component({
	selector: 'card-my-destination',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './card-my-destination.component.html',
	styleUrl: './card-my-destination.component.css'
})
export class CardMyDestinationComponent {
	@Input({ required: true }) destination!: Destination

	staticMapUrl!: SafeResourceUrl

	constructor(private readonly sanitizer: DomSanitizer) {}

	ngOnInit() {
		const unsafeStaticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=${this.constructDestinationPositionString(this.destination)}&size=300x300&key=${GOOGLE_MAPS_API_KEY}`

		this.staticMapUrl =
			this.sanitizer.bypassSecurityTrustResourceUrl(unsafeStaticMapUrl)
	}

	private constructDestinationPositionString(destination: Destination): string {
		return `${destination.latitude},${destination.longitude}`
	}
}
