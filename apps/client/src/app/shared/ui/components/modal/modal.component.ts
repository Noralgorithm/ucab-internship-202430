import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
@Component({
	selector: 'modal',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.css'
})
export class ModalComponent {
	@Input() title = ''
	@Input() show = true
	@Input() srcIcon = ''
	@Input() isOpen = true
	@Output() isOpenChange = new EventEmitter<boolean>()

	@Input() variant: 'simple' | 'actions' | 'confirmation' = 'simple'

	@Output() onConfirm = new EventEmitter()
	@Output() onCancel = new EventEmitter()
	@Output() onClose = new EventEmitter()

	@Input() isConfirmButtonDisabled = false

	confirm() {
		this.onConfirm.emit()
		this.closeModal()
	}

	cancel() {
		this.onCancel.emit()
		this.closeModal()
	}

	closeModal() {
		this.isOpenChange.emit(false)
		this.onClose.emit()
	}
}
