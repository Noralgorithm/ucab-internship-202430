import { Component } from '@angular/core'
import { LocationSelectorMapComponent } from '~/features/maps/components/location-selector-map/location-selector-map.component'
import { ModalComponent } from '~/shared/ui/components/modal/modal.component'
import { ModalService } from '~/shared/ui/components/modal/modal.service'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-my-destinations',
	standalone: true,
	imports: [PageLayoutComponent, LocationSelectorMapComponent, ModalComponent],
	templateUrl: './my-destinations.component.html',
	styleUrl: './my-destinations.component.css'
})
export class MyDestinationsComponent {
	constructor(private readonly modalService: ModalService) {}

	ngOnInit() {
		this.modalService.openModal()
	}
}
