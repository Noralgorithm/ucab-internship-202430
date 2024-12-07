import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { DeleteOwnVehicleService } from '~/features/vehicles/api/delete-own-vehicle.service'
import { VehicleImageComponent } from '~/features/vehicles/components/vehicle-image/vehicle-image.component'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
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
		private readonly router: Router,
		private readonly toastrService: ToastrService
	) {}
	@Input({ required: true }) vehicle!: Vehicle
	@Output() updateVehicles = new EventEmitter()

	handleDelete(id: string) {
		this.deleteOwnVehicleService.execute(id).subscribe({
			next: (res) => {
				this.updateVehicles.emit()
				this.toastrService.success('Vehículo eliminado con éxito')
			},
			error: () => {
				this.toastrService.error('Error eliminado el vehículo')
			}
		})
	}

	navigateToEditPage(id: string) {
		this.router.navigate(['/app/my-vehicle/edit'], {
			queryParams: { id: id }
		})
	}
}
