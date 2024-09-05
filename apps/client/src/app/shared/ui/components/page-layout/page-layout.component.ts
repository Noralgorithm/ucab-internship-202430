import { Component } from '@angular/core'

@Component({
	selector: 'page-layout',
	standalone: true,
	imports: [],
	template: '<ng-content></ng-content>',
	styles: `
		:host {
			display: flex;
			flex-direction: column;
			justify-content: start;
			align-items: center;
			height: 100dvh;
			max-width: 24.375rem;
			margin: 0 auto;
			padding: 0 1rem;
		}
	`
})
export class PageLayoutComponent {}
