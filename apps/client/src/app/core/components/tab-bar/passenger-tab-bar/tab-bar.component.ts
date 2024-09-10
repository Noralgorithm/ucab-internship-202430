import { Component } from '@angular/core'
import { TabBarItemComponent } from '../tab-bar-item/tab-bar-item.component'

@Component({
	selector: 'passenger-tab-bar',
	standalone: true,
	imports: [TabBarItemComponent],
	templateUrl: './tab-bar.component.html',
	styleUrl: './tab-bar.component.css'
})
export class PassengerTabBarComponent {}
