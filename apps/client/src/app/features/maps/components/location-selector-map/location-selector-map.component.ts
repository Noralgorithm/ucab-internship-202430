import { Component } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { UcabLocationService } from '~/features/maps/ucab-location.service'

@Component({
	selector: 'location-selector-map',
	standalone: true,
	imports: [],
	templateUrl: './location-selector-map.component.html',
	styleUrl: './location-selector-map.component.css'
})
export class LocationSelectorMapComponent {
	mapSrc: SafeResourceUrl

	constructor(
		readonly ucabLocationService: UcabLocationService,
		private readonly sanitizer: DomSanitizer
	) {
		this.ucabLocationService.getUcabLocationString
		const unsafeMapSrc = `//www.google.com/maps/embed/v1/place?language=es&key=AIzaSyC9VB23WxTYtPIzLMBVMlM0wKWHq12Wh6k&q=${this.ucabLocationService.getUcabLocationString()}`

		this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeMapSrc)
	}
}
