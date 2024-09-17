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
		return UCAB_LATITUDE
	}

	getUcabLongitude() {
		return UCAB_LONGITUDE
	}
}
