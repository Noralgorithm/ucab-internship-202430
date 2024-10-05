import { Injectable } from '@angular/core'
import { UCAB_LATITUDE, UCAB_LONGITUDE } from '~/shared/constants'

@Injectable({
	providedIn: 'root'
})
export class UcabLocationService {
	getUcabLocationString() {
		return `${UCAB_LATITUDE},${UCAB_LONGITUDE}`
	}

	getUcabLatitude() {
		return Number(UCAB_LATITUDE)
	}

	getUcabLongitude() {
		return Number(UCAB_LONGITUDE)
	}

	getUcabLatLng() {
		return {
			lat: this.getUcabLatitude(),
			lng: this.getUcabLongitude()
		}
	}
}
