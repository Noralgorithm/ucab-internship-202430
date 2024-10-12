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
	@Input({ required: true }) actionButtons = true

	staticMapUrl!: SafeResourceUrl

	imageDestinationUrl = ''

	constructor(private readonly sanitizer: DomSanitizer) {}

	ngOnInit() {
		const unsafeStaticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=${this.constructDestinationPositionString(this.destination)}&size=300x300&key=${GOOGLE_MAPS_API_KEY}`

		this.getImageByUrl(unsafeStaticMapUrl)

		this.staticMapUrl =
			this.sanitizer.bypassSecurityTrustResourceUrl(unsafeStaticMapUrl)
	}

	async getImageByUrl(url: string) {
		const image = await fetch(url)
		const imageBlob = await image.blob()
		const reader = new FileReader()
		let imageBlobUrl = ''

		reader.onload = () => {
			imageBlobUrl = reader.result as string
			setTimeout(() => {
				this.imageDestinationUrl = imageBlobUrl
			})
		}
		reader.readAsDataURL(imageBlob)
	}

	private constructDestinationPositionString(destination: Destination): string {
		return `${destination.latitude},${destination.longitude}`
	}
}
