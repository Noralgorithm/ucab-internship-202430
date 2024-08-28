import { Directive, HostBinding, Input } from '@angular/core'

@Directive({
	selector: '[appearance]',
	standalone: true
})
export class AppearanceDirective {
	@Input() appearance: 'filled' | 'outlined' = 'filled'

	@HostBinding('class')
	get appearanceClass() {
		return `button-${this.appearance}`
	}
}
