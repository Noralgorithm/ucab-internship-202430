import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { DriverCardComponent } from '~/features/drivers/components/driver-card/driver-card.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-available-drivers',
	standalone: true,
	imports: [PageLayoutComponent, DriverCardComponent, RouterLink],
	templateUrl: './available-drivers.component.html',
	styleUrl: './available-drivers.component.css'
})
export class AvailableDriversComponent {}
