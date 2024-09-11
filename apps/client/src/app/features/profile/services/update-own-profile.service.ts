import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SuccesfulResponse } from '~/shared/types/backend-response.type'
import { UserRole } from '~/shared/types/users/user-role.type'

@Injectable({
	providedIn: 'root'
})
export class UpdateOwnProfileService {
	constructor(private readonly http: HttpClient) {}

	execute(updateOwnProfileServiceDto: UpdateOwnProfileServiceDto) {
		return this.http.patch<SuccesfulResponse<unknown>>(
			'/profile/me',
			this.parseRequestDto(updateOwnProfileServiceDto)
		)
	}

	private parseRequestDto(
		updateOwnProfileServiceDto: UpdateOwnProfileServiceDto
	): FormData {
		const formData = new FormData()

		const object = {
			...updateOwnProfileServiceDto,
			walkDistance: String(updateOwnProfileServiceDto.walkDistance)
		}

		for (const key in object) {
			formData.append(key, updateOwnProfileServiceDto[key as keyof object])
		}

		return formData
	}
}

export interface UpdateOwnProfileServiceDto {
	profilePic?: File
	preferredRole?: UserRole
	walkDistance?: number
	phoneNumber?: string
	emergencyContactPhoneNumber?: string
}
