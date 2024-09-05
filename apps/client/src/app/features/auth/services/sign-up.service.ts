import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { BackendResponse } from '../../../shared/types/backend-response.type'
import { Gender } from '../../../shared/types/users/user-gender.type'
import { UserType } from '../../../shared/types/users/user-type.type'
import { parseBackendResponseStatus } from '../../../shared/utils/parse-backend-response-status.util'

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

		return this.http
			.post<BackendResponse<unknown, unknown>>('/auth/sign-up', formData)
			.pipe(map(parseBackendResponseStatus))
	}
}

export interface SignUpServiceDto {
	firstName: string
	lastName: string
	password: string
	gender: Gender
	type: UserType
	signUpRequestId: string
	profilePic: File
}
