import { JsonPipe } from '@angular/common'
import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { GetOwnProfileService } from '~/features/profile/services/get-own-profile.service'
import {
	UpdateOwnProfileService,
	UpdateOwnProfileServiceDto
} from '~/features/profile/services/update-own-profile.service'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { UserRole } from '~/shared/types/users/user-role.type'
import { ButtonComponent } from '~/shared/ui/components/button/button.component'
import { PageLayoutComponent } from '~/shared/ui/components/page-layout/page-layout.component'
import { RadioButtonComponent } from '~/shared/ui/components/radio-button/radio-button.component'
import { TextInputComponent } from '~/shared/ui/components/text-input/text-input.component'
import { removeNullProperties } from '~/shared/utils/remove-null-properties.util'

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
		ButtonComponent,
		JsonPipe
	],
	templateUrl: './edit-profile.component.html',
	styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
	constructor(
		private readonly router: Router,
		private readonly getOwnProfileService: GetOwnProfileService,
		private readonly updateOwnProfileService: UpdateOwnProfileService
	) {}

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
		profilePic: new FormControl<File | null>(null),
		walkDistance: new FormControl(0, [
			Validators.required,
			Validators.max(150)
		]),
		phoneNumber: new FormControl('', [Validators.required]),
		emergencyContactPhoneNumber: new FormControl('', [Validators.required]),
		preferredRole: new FormControl<UserRole>('passenger', [Validators.required])
	})

	handleSubmit() {
		if (this.editProfileFormGroup.invalid)
			throw new Error('Invalid editProfileFormGroup value')

		const updateProfileDto = removeNullProperties<UpdateOwnProfileServiceDto>(
			this.editProfileFormGroup.value
		)

		this.updateOwnProfileService.execute(updateProfileDto).subscribe({
			next: (res) => {
				this.router.navigate(['/app/profile'])
			}
		})
	}

	editProfilePic() {
		this.uploadProfilePic = true
	}

	onImageUpload(event: Event) {
		if (!event.target) return

		const file = (event.target as HTMLInputElement).files?.[0]

		this.editProfileFormGroup.patchValue({ profilePic: file ?? null })
	}
}
