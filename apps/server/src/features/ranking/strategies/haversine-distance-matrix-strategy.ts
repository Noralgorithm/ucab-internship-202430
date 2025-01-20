// import { GeoJsonPoint } from '~/shared/types'
// import { Destination, DistanceMatrix, Origin } from './types'

// export class HaversineDistanceMatrixStrategy implements DistanceMatrix {
// 	async get({
// 		origins,
// 		destinations
// 	}: { origins: Origin[]; destinations: Destination[] }): Promise<
// 		DistanceMatrix[]
// 	> {}
// }

// function getHaversineDistanceFromTwoPoints(
// 	originPoint: GeoJsonPoint,
// 	destinationPoint: GeoJsonPoint
// ) {
// 	const origin = {
// 		lat: (originPoint.coordinates[1] * Math.PI) / 180,
// 		lng: (originPoint.coordinates[0] * Math.PI) / 180
// 	}

// 	const destination = {
// 		lat: (destinationPoint.coordinates[1] * Math.PI) / 180,
// 		lng: (destinationPoint.coordinates[0] * Math.PI) / 180
// 	}

// 	const Δlat = destination.lat - origin.lat
// 	const Δlng = destination.lng - origin.lng
// }

// /**
//  * Extracted from [here](https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
//  */
// const EARTH_EQUATORIAL_RADIUS = 6378137

// Rosas : eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQubW92aWMuc3VzdGVudGFiaWxpZGFkdGVjaC5sYXQiLCJzdWIiOiI5ZGNkYjUyOS0yMzQ0LTQzMjMtYjY0My0wMDA3Mjk5OTAxZDgiLCJhdWQiOiJodHRwczovL21vdmljLnN1c3RlbnRhYmlsaWRhZHRlY2gubGF0IiwiZXhwIjoxNzM0Mzc0NDk1LjAxMiwibmJmIjoxNzMxNzgyNTAwLjAxMywiaWF0IjoxNzMxNzgyNDk1LjAxMywianRpIjoiYzE5YWE5NTItYjVhMS00MmM2LWJiNmYtOGE2OTUzNGUzN2M3In0.Q7jQXVyqgOtO2ci6_Ffxiu9Tj3iGHC4iT5NZMRCtyM34D4Sc1upQrX5dnzKqwloR
// Yo: eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQubW92aWMuc3VzdGVudGFiaWxpZGFkdGVjaC5sYXQiLCJzdWIiOiJkNjljODY1YS0zMTU5LTQxNDctOWRlYS00Y2JlYTVmMGVmNTkiLCJhdWQiOiJodHRwczovL21vdmljLnN1c3RlbnRhYmlsaWRhZHRlY2gubGF0IiwiZXhwIjoxNzM0Mzc0NzQ2LjE5OSwibmJmIjoxNzMxNzgyNzQ3LjIsImlhdCI6MTczMTc4Mjc0Ni4yLCJqdGkiOiJkNzQzZjA4NS1mNmJjLTRkMmEtODIyMi05NjRlOTk4YmFhMjMifQ.-23RJiX-KZBx7bXijqp80NO4zF9HJA5qnMAshQYiuH3xLQ8KXPqNtNDXtkJF-l2X
