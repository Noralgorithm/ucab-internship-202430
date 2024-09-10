import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { GetOwnProfileService } from '~/features/profile/services/get-own-profile.service'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { UserRole } from '~/shared/types/users/user-role.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { RadioButtonComponent } from '~/shared/ui/components/radio-button/radio-button.component'
import { TextInputComponent } from '~/shared/ui/components/text-input/text-input.component'

@Component({
	selector: 'app-edit-profile',
	standalone: true,
	imports: [
		PageLayoutComponent,
		RadioButtonComponent,
		ReactiveFormsModule,
		RouterLink,
		RouterLinkActive,
		TextInputComponent,
		ButtonComponent
	],
	templateUrl: './edit-profile.component.html',
	styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
	constructor(private readonly getOwnProfileService: GetOwnProfileService) {}

	profile: UserProfile | undefined
	uploadProfilePic = false

	ngOnInit() {
		this.getOwnProfileService.execute().subscribe((res) => {
			this.profile = res.data
			this.editProfileFormGroup.patchValue({
				walkDistance: this.profile.walkDistance,
				phoneNumber: this.profile.phoneNumber,
				emergencyContactPhoneNumber: this.profile.emergencyContactPhoneNumber,
				preferredRole: this.profile.preferredRole
			})
		})
	}

	editProfileFormGroup = new FormGroup({
		profilePic: new FormControl<File | undefined>(undefined, [
			Validators.required
		]),
		walkDistance: new FormControl(0, [Validators.required]),
		phoneNumber: new FormControl('', [Validators.required]),
		emergencyContactPhoneNumber: new FormControl('', [Validators.required]),
		preferredRole: new FormControl<UserRole>('passenger', [Validators.required])
	})

	handleSubmit() {
		alert('editando el perfil')
	}

	editProfilePic() {
		this.uploadProfilePic = true
	}

	onImageUpload(event: Event) {
		if (!event.target) return

		const file = (event.target as HTMLInputElement).files?.[0]

		this.editProfileFormGroup.patchValue({ profilePic: file })
	}
}
