import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { GetVehicleByIdService } from '~/features/vehicles/api/get-vehicle-by-id.service'
import {
	UpdateOwnVehicleService,
	UpdateOwnVehicleServiceDto
} from '~/features/vehicles/api/update-own-vehicle.service'
import { VehiclesColorsService } from '~/features/vehicles/vehicles-colors.service'
import { SelectOption } from '~/shared/types/select-option.type'
import { Vehicle } from '~/shared/types/vehicles/vehicle.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { DropdownComponent } from '~/shared/ui/components/dropdown/dropdown.component'
import { NumberInputComponent } from '~/shared/ui/components/number-input/number-input.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { TextInputComponent } from '~/shared/ui/components/text-input/text-input.component'
import { removeNullProperties } from '~/shared/utils/remove-null-properties.util'

@Component({
	selector: 'app-edit-vehicle',
	standalone: true,
	imports: [
		PageLayoutComponent,
		RouterLink,
		NumberInputComponent,
		TextInputComponent,
		ReactiveFormsModule,
		DropdownComponent,
		ButtonComponent
	],
	templateUrl: './edit-vehicle.component.html',
	styleUrl: './edit-vehicle.component.css'
})
export class EditVehicleComponent {
	constructor(
		private readonly getVehicleByIdService: GetVehicleByIdService,
		private readonly updateOwnVehicleService: UpdateOwnVehicleService,
		private readonly vehiclesColorsService: VehiclesColorsService,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly toastrService: ToastrService
	) {}

	vehicle: Vehicle | null = null

	vehicleId = ''

	colors: SelectOption[] = [
		{ value: '', label: 'Seleccione un color de vehículo' }
	]

	editVehicleFormGroup = new FormGroup({
		plate: new FormControl('', [
			Validators.required,
			Validators.maxLength(7),
			Validators.minLength(7)
		]),
		brand: new FormControl('', Validators.required),
		color: new FormControl('', Validators.required),
		model: new FormControl('', Validators.required),
		seatQuantity: new FormControl<number>(1, [
			Validators.required,
			Validators.max(4)
		])
	})

	ngOnInit() {
		this.colors = [
			...this.colors,
			...this.vehiclesColorsService.getColorsOptions()
		]
		this.route.queryParams.subscribe((params) => {
			this.vehicleId = params['id']

			if (this.vehicleId) {
				this.getVehicleByIdService.execute(this.vehicleId).subscribe((res) => {
					this.vehicle = res.data
					this.editVehicleFormGroup.patchValue({
						plate: this.vehicle.plate,
						brand: this.vehicle.brand,
						color: this.vehicle.color,
						model: this.vehicle.model,
						seatQuantity: this.vehicle.seatQuantity
					})
				})
			}
		})
	}

	handleSubmit() {
		if (this.editVehicleFormGroup.invalid)
			throw new Error('Invalid editVehicleFormGroup value')

		const updateOwnVehicleDto =
			removeNullProperties<UpdateOwnVehicleServiceDto>({
				...this.editVehicleFormGroup.value,
				id: this.vehicle?.id
			})

		this.updateOwnVehicleService
			.execute(this.vehicleId, updateOwnVehicleDto)
			.subscribe({
				next: (res) => {
					this.router.navigate(['/app/my-vehicles'])
				},
				error: (err) => {
					this.toastrService.error('Error al actualizar el vehículo')
				}
			})
	}
}
