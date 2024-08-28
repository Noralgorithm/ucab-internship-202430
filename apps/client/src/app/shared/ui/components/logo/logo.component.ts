import { Component, Input } from '@angular/core'
import { LogoIconComponent } from '../logo-icon/logo-icon.component'

@Component({
	selector: 'brand-logo',
	standalone: true,
	imports: [LogoIconComponent],
	template: `
  <div class="logo-container">
    <logo-icon [width]="getStyles().iconWidth" />
    <span class="brand-name" [style.fontSize]="getStyles().fontSize">
      MoviC
    </span>
  </div>
  `,
	styles: `
  .logo-container {
    user-select: none;
    display: flex;
    gap: 0.5rem;
    height: 100%;
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

	public readonly SIZE_STYLES = {
		small: {
			iconWidth: '3rem',
			fontSize: '2rem'
		},
		large: {
			iconWidth: '5.44rem',
			fontSize: '3.2rem'
		}
	}

	public getStyles() {
		return this.SIZE_STYLES[this.size]
	}
}

const SIZES = ['small', 'large'] as const
type Size = (typeof SIZES)[number]
