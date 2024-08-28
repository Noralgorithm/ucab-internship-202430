import { Directive, HostBinding, Input } from '@angular/core'

@Directive({
	selector: '[size]',
	standalone: true
})
export class SizesDirective {
	@Input() size: 'small' | 'medium' | 'large' | null | undefined = 'medium'

	@HostBinding('class')
	protected get computedHostClass() {
		return this.size
	}
}
