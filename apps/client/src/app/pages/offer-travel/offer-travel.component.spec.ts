import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OfferTravelComponent } from './offer-travel.component'

describe('OfferTravelComponent', () => {
	let component: OfferTravelComponent
	let fixture: ComponentFixture<OfferTravelComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OfferTravelComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(OfferTravelComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
