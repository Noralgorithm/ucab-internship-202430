import { Component } from '@angular/core'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { DriverCardComponent } from '../../features/drivers/components/driver-card/driver-card.component'

@Component({
	selector: 'app-available-drivers',
	standalone: true,
	imports: [PageLayoutComponent, DriverCardComponent],
	templateUrl: './available-drivers.component.html',
	styleUrl: './available-drivers.component.css'
})
export class AvailableDriversComponent {}
