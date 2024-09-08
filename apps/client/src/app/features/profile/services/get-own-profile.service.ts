import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { Gender } from '~/shared/types/users/user-gender.type'
import { UserProfile } from '~/shared/types/users/user-profile.type'
import { UserRole } from '~/shared/types/users/user-role.type'
import { UserType } from '~/shared/types/users/user-type.type'
import { constructBackendImageUrl } from '~/shared/utils/construct-backend-image-url.util'

@Injectable({
	providedIn: 'root'
})
export class GetOwnProfileService {
	constructor(private readonly http: HttpClient) {}

	execute() {
		return this.http
			.get<SuccesfulResponse<ResponseDto>>('/profile/me')
			.pipe(map(this.parseResponse))
	}

	parseResponse(
		response: SuccesfulResponse<ResponseDto>
	): SuccesfulResponse<UserProfile> {
		return {
			status: response.status,
			data: {
				...response.data,
				profilePicSrc: constructBackendImageUrl(
					response.data.profilePicFilename
				)
			}
		}
	}
}

interface ResponseDto {
	firstName: string
	lastName: string
	email: string
	gender: Gender
	type: UserType
	walkDistance: number
	preferredRole: UserRole
	profilePicFilename: string
	phoneNumber: string | null
	emergencyContactPhoneNumber: string | null
	isDriver: boolean
	isActive: boolean
	isBlocked: boolean
}
