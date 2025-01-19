import { Component, HostBinding, Input } from '@angular/core'
import { LogoIconComponent } from '../logo-icon/logo-icon.component'

@Component({
	selector: 'brand-logo',
	standalone: true,
	imports: [LogoIconComponent],
	template: `
    <logo-icon [width]="getStyles().iconWidth" [color]="'white'" />
    <span class="brand-name" [style.fontSize]="getStyles().fontSize" [style.color]="getStyles().color">
      MoviC
    </span>
  `,
	styles: `
  :host {
    user-select: none;
    display: flex;
		align-items: center;
		height: fit;
		justify-content: center;
  }

  .brand-name {
    font-size: 2rem;
    font-weight: 700;
    margin: auto;
  }
  `
})
export class LogoComponent {
	@Input() size: Size = 'small'
	@Input() color: Color = 'black'

	public readonly SIZE_STYLES = {
		small: {
			iconWidth: '3rem',
			fontSize: '2rem',
			logoContainerWidth: '10.125rem'
		},
		large: {
			iconWidth: '5.44rem',
			fontSize: '3.4rem',
			logoContainerWidth: '18.25rem'
		}
	}

	public readonly COLOR_STYLES = {
		black: {
			color: '#000'
		},
		white: {
			color: '#fff'
		}
	}

	public getStyles() {
		return { ...this.SIZE_STYLES[this.size], ...this.COLOR_STYLES[this.color] }
	}

	@HostBinding('style.width') get width() {
		return this.getStyles().logoContainerWidth
	}
}

const SIZES = ['small', 'large'] as const
type Size = (typeof SIZES)[number]

type Color = 'black' | 'white'
