import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ViewTravelsComponent } from './view-travels.component'

describe('ViewTravelsComponent', () => {
	let component: ViewTravelsComponent
	let fixture: ComponentFixture<ViewTravelsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ViewTravelsComponent]
		}).compileComponents()

		fixture = TestBed.createComponent(ViewTravelsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
