import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DeleteOwnVehicleService } from '~/features/vehicles/services/delete-own-vehicle.service'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '../button/button.component'
import { VehicleImageComponent } from '../vehicle-image/vehicle-image.component'

@Component({
	selector: 'card-vehicle',
	standalone: true,
	imports: [VehicleImageComponent, ButtonComponent],
	templateUrl: './card-vehicle.component.html',
	styleUrl: './card-vehicle.component.css'
})
export class CardVehicleComponent {
	constructor(
		private readonly deleteOwnVehicleService: DeleteOwnVehicleService
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
}
