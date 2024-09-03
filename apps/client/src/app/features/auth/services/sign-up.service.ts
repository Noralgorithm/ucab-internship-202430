import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Gender } from '../../../shared/types/users/user-gender.type'
import { UserType } from '../../../shared/types/users/user-type.type'

@Injectable({
	providedIn: 'root'
})
export class SignUpService {
	constructor(private readonly http: HttpClient) {}

	execute(signUpServiceDto: SignUpServiceDto) {
		const formData = new FormData()

		for (const key in signUpServiceDto) {
			formData.append(key, signUpServiceDto[key as keyof SignUpServiceDto])
		}

		return this.http.post('/auth/sign-up', formData)
	}
}

export interface SignUpServiceDto {
	firstName: string
	lastName: string
	password: string
	gender: Gender
	type: UserType
	phoneNumber: string
	emergencyContactPhoneNumber: string
	signUpRequestId: string
	profilePic: File
}
