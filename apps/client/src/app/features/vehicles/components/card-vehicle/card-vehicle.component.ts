import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { DeleteOwnVehicleService } from '~/features/vehicles/api/delete-own-vehicle.service'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { VehicleImageComponent } from '~/shared/ui/components/vehicle-image/vehicle-image.component'
import { VehiclesColorsService } from '../../vehicles-colors.service'

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
		readonly vehiclesColorsService: VehiclesColorsService,
		private readonly router: Router
	) {}
	@Input({ required: true }) vehicle!: Vehicle
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
