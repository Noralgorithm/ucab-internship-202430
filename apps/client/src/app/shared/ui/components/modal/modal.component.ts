import { Component, Input } from '@angular/core'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { ModalService } from './modal.service'
@Component({
	selector: 'modal',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css'
})
export class ModalComponent {
	constructor(public modalService: ModalService) {}
	@Input() tittle = ''
	@Input() show = true
	@Input() srcIcon = ''

	onClose() {
		this.modalService.closeModal()
	}
}
