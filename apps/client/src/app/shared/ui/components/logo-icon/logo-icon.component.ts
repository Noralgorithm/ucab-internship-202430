import { Component, HostBinding, Input } from '@angular/core'

@Component({
	selector: 'logo-icon',
	standalone: true,
	imports: [],
	templateUrl: './logo-icon.component.html',
	styles: `
	:host {
		aspect-ratio: 81 / 84;
		display: inline-block;
		margin: auto;
	}`
})
export class LogoIconComponent {
	@Input() width = '3rem'
	@Input() color: Color = 'black'

	@HostBinding('style')
	get computedHostStyle() {
		return {
			width: this.width,
			fill: this.color === 'white' ? '#fff' : '#000'
		}
	}
}

export type Color = 'black' | 'white'
