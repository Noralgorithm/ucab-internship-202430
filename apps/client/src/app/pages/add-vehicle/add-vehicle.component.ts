import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import {
	CreateOwnVehicleService,
	CreateOwnVehicleServiceDto
} from '~/features/vehicles/api/create-own-vehicle.service'
import { VehiclesColorsService } from '~/features/vehicles/vehicles-colors.service'
import { SelectOption } from '~/shared/types/select-option.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { DropdownComponent } from '~/shared/ui/components/dropdown/dropdown.component'
import { NumberInputComponent } from '~/shared/ui/components/number-input/number-input.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { TextInputComponent } from '~/shared/ui/components/text-input/text-input.component'
import { removeNullProperties } from '~/shared/utils/remove-null-properties.util'

@Component({
	selector: 'app-add-vehicle',
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
	templateUrl: './add-vehicle.component.html',
	styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent {
	constructor(
		private readonly createOwnVehicleService: CreateOwnVehicleService,
		private readonly vehiclesColorsService: VehiclesColorsService,
		private readonly router: Router,
		private readonly toastrService: ToastrService
	) {}

	colors: SelectOption[] = [
		{ value: '', label: 'Seleccione un color de vehículo' }
	]

	ngOnInit() {
		this.colors = [
			...this.colors,
			...this.vehiclesColorsService.getColorsOptions()
		]
	}

	addVehicleFormGroup = new FormGroup({
		plate: new FormControl('', [
			Validators.required,
			Validators.maxLength(7),
			Validators.minLength(6)
		]),
		brand: new FormControl('', Validators.required),
		color: new FormControl('', Validators.required),
		model: new FormControl('', Validators.required),
		seatQuantity: new FormControl<number>(1, [
			Validators.required,
			Validators.max(4)
		])
	})

	handleSubmit() {
		if (this.addVehicleFormGroup.invalid)
			throw new Error('Invalid editProfileFormGroup value')

		const createOwnVehicleDto =
			removeNullProperties<CreateOwnVehicleServiceDto>(
				this.addVehicleFormGroup.value
			)

		this.createOwnVehicleService.execute(createOwnVehicleDto).subscribe({
			next: (res) => {
				this.router.navigate(['/app/my-vehicles'])
			},
			error: (err) => {
				this.toastrService.error('Error al agregar el vehículo')
			}
		})
	}
}
