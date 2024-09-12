import { Component, Input } from '@angular/core'
import tinyColor from 'tinycolor2'

@Component({
	selector: 'movic-vehicle',
	standalone: true,
	imports: [],
	templateUrl: './vehicle-image.component.html',
	styles: `
		:host {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
		}
	`
})
export class VehicleImageComponent {
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
