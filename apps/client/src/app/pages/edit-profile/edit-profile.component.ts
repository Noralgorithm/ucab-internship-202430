import { Component } from '@angular/core'
import { PageLayoutComponent } from '../../shared/ui/components/page-layout/page-layout.component'

@Component({
	selector: 'app-edit-profile',
	standalone: true,
	imports: [PageLayoutComponent],
	templateUrl: './edit-profile.component.html',
	styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {}
