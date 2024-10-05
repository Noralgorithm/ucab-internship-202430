import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

const geometry = (await google.maps.importLibrary(
	'geometry'
)) as google.maps.GeometryLibrary

@Injectable({
	providedIn: 'root'
})
export class ComputeRoutesService {
	constructor(private readonly http: HttpClient) {}

	fromUcab(location: google.maps.LatLng) {}

	toUcab(location: google.maps.LatLng) {}
}
