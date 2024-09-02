import { Directive, HostBinding, Input } from '@angular/core'

@Directive({
	selector: '[severity]',
	standalone: true
})
export class ColorSeverityDirective {
	@Input() severity:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'contrast'
		| 'success'
		| 'info'
		| 'warning'
		| 'danger'
		| 'help'
		| 'transparent'
		| null
		| undefined = 'primary'

	@HostBinding('class')
	protected get computedHostClass() {
		return `severity-${this.severity}`
	}
}
