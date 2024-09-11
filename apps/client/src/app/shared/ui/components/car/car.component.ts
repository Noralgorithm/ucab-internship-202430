import { Component, Input } from '@angular/core'
import tinyColor from 'tinycolor2'

@Component({
	selector: 'movic-car',
	standalone: true,
	imports: [],
	templateUrl: './car.component.html',
	styleUrl: './car.component.css'
})
export class CarComponent {
	@Input({ required: true }) color!: string

	colorHex = ''
	lightColorHex = ''
	lighterColorHex = ''

	ngOnInit() {
		const colorObject = tinyColor(this.color)

		this.colorHex = colorObject.toHexString()
		this.lightColorHex = colorObject.lighten(10).toHexString()
		this.lighterColorHex = colorObject.lighten(20).toHexString()
	}
}
