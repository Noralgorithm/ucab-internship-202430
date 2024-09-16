import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class OwnLocationService {
	$location = new Observable<GeolocationPosition>((subscriber) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					subscriber.next(position)
				},
				(error) => {
					subscriber.error(error)
				},
				this.options
			)
		} else {
			subscriber.error('Geolocation is not supported.')
		}
	})

	private options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	}
}
