import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	show = false

	openModal() {
		this.show = true
	}

	closeModal() {
		this.show = false
	}
}
