import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { DeleteOwnVehicleService } from '~/features/vehicles/services/delete-own-vehicle.service'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '../button/button.component'
import { VehicleImageComponent } from '../vehicle-image/vehicle-image.component'

@Component({
	selector: 'card-vehicle',
	standalone: true,
	imports: [VehicleImageComponent, ButtonComponent, RouterLink],
	templateUrl: './card-vehicle.component.html',
	styleUrl: './card-vehicle.component.css'
})
export class CardVehicleComponent {
	constructor(
		private readonly deleteOwnVehicleService: DeleteOwnVehicleService,
		private readonly router: Router
	) {}
	@Input() vehicle: Vehicle | null = null
	@Output() updateVehicles = new EventEmitter()

	handleDelete(id: string) {
		this.deleteOwnVehicleService.execute(id).subscribe({
			next: (res) => {
				alert('Vehiculo eliminado')
				this.updateVehicles.emit()
			}
		})
	}

	navigateToEditPage(id: string) {
		this.router.navigate(['/app/my-vehicle/edit'], {
			queryParams: { id: id }
		})
	}
}
