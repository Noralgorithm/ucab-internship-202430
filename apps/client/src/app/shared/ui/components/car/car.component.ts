import { Component, Input } from '@angular/core'
import tinyColor from 'tinycolor2'

@Component({
	selector: 'movic-car',
	standalone: true,
	imports: [],
	templateUrl: './car.component.html',
	styles: `
		:host {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
		}
	`
})
export class CarComponent {
	@Input() color = '#262626'

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
