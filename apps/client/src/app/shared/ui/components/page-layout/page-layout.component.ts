import { Component, HostBinding, Input } from '@angular/core'

@Component({
	selector: 'page-layout',
	standalone: true,
	imports: [],
	template: '<div class="container"><ng-content></ng-content></div>',
	styles: `
		:host {
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			height: 100dvh;
			width: 100%;
			padding: 0 2rem;
			overflow-y: auto;
		}
		
		.container {
			max-width: 28.375rem;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
		}
	`
})
export class PageLayoutComponent {
	@Input() hasTabBar = false

	@HostBinding('style.padding-bottom')
	get paddingBottom() {
		return this.hasTabBar ? '7rem' : '0'
	}
}
