import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import {
	CreateOwnVehicleService,
	CreateOwnVehicleServiceDto
} from '~/features/vehicles/services/create-own-vehicle.service'
import { Option } from '~/shared/types/vehicles/option.type'
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
		private readonly router: Router
	) {}
	colors: Option[] = [
		{ value: '', label: 'Seleccione un color de vehículo' },
		{ value: 'black', label: 'Negro' },
		{ value: 'white', label: 'Blanco' },
		{ value: 'blue', label: 'Azul' },
		{ value: 'gray', label: 'Gris' },
		{ value: 'silver', label: 'Plateado' },
		{ value: 'red', label: 'Rojo' },
		{ value: 'green', label: 'Verde' },
		{ value: 'yellow', label: 'Amarillo' },
		{ value: 'purple', label: 'Morado' },
		{ value: 'pink', label: 'Rosado' },
		{ value: 'orange', label: 'Naranja' }
	]

	addVehicleFormGroup = new FormGroup({
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
			}
		})
	}
}
