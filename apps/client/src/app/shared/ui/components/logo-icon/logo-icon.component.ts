import { Component, HostBinding, Input } from '@angular/core'
import { Color } from '../../colors.enum'

@Component({
	selector: 'logo-icon',
	standalone: true,
	imports: [],
	templateUrl: './logo-icon.component.html',
	styles: `
	:host {
		aspect-ratio: 48 / 47;
		display: inline-block;
		margin: auto;
	}`
})
export class LogoIconComponent {
	@Input() width = '3rem'
	@Input() color: Color = Color.Primary

	@HostBinding('style')
	get computedHostStyle() {
		return {
			width: this.width,
			fill: `var(--${this.color})`
		}
	}
}
