import { Component, HostBinding } from '@angular/core'
import { AppearanceDirective } from '../../directives/appearance.directive'
import { ColorSeverityDirective } from '../../directives/color-severity.directive'
import { SizesDirective } from '../../directives/sizes.directive'

@Component({
	selector: 'button[mButton], a[mButton]',
	standalone: true,
	imports: [],
	template: '<ng-content></ng-content>',
	styleUrls: ['./button.component.css'],
	hostDirectives: [
		{ directive: ColorSeverityDirective, inputs: ['severity'] },
		{ directive: AppearanceDirective, inputs: ['appearance'] },
		{ directive: SizesDirective, inputs: ['size'] }
	]
})
export class ButtonComponent {
	@HostBinding('class.mbutton') mbutton = true
}
