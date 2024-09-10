import { CommonModule } from '@angular/common'
import { Component, HostBinding, Input } from '@angular/core'
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
	@Input() activeTextColor = 'var(--primary-text-value)'
	@Input() activeIconColor = 'var(--primary-icon-darker)'
	@Input() href = ''

	@HostBinding('style')
	get style() {
		return {
			'--active-text-color': this.activeTextColor,
			'--active-icon-color': this.activeIconColor
		}
	}

	isActive = false
}
