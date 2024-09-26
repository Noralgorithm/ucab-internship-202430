import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TabBarItemComponent } from '../tab-bar-item/tab-bar-item.component'

@Component({
	selector: 'driver-tab-bar',
	standalone: true,
	imports: [TabBarItemComponent, RouterLink],
	templateUrl: './tab-bar.component.html',
	styleUrl: './tab-bar.component.css'
})
export class DriverTabBarComponent {
	activeTabBarItemTextColor = 'var(--tertiary-text-value)'
	activeTabBarItemIconColor = 'var(--tertiary-icon-darker)'
}
