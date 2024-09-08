import { BACKEND_BASE_URL } from '~/config'

export function constructBackendImageUrl(filename: string) {
	return `${BACKEND_BASE_URL}/files/${filename}`
}
