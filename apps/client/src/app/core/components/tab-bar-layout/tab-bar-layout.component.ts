import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TabBarComponent } from '../tab-bar/tab-bar.component'

@Component({
	selector: 'tab-bar-layout',
	standalone: true,
	imports: [TabBarComponent, RouterOutlet],
	templateUrl: './tab-bar-layout.component.html',
	styleUrl: './tab-bar-layout.component.css'
})
export class TabBarLayoutComponent {}
