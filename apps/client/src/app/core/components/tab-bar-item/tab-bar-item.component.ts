import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
	selector: 'tab-bar-item',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive],
	templateUrl: './tab-bar-item.component.html',
	styleUrl: './tab-bar-item.component.css'
})
export class TabBarItemComponent {
	@Input({ required: true }) iconSrc!: string
	@Input({ required: true }) label!: string
	@Input() href = ''

	isActive = false
}
