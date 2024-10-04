import { Component } from '@angular/core'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-route-selection',
	standalone: true,
	imports: [PageLayoutComponent],
	templateUrl: './route-selection.component.html',
	styleUrl: './route-selection.component.css'
})
export class RouteSelectionComponent {}
