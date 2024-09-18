import { Component, Input } from '@angular/core'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
@Component({
	selector: 'modal',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css'
})
export class ModalComponent {
	@Input() tittle = ''
	@Input() content = ''
	@Input() show = true
	@Input() srcIcon = 'assets/svgs/Alert.svg'

	onClose() {
		this.show = false
	}
}
