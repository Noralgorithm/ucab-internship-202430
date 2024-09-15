import dotenv from 'dotenv'

dotenv.config()

export const environment = {
	IS_PRODUCTION: true,
	BACKEND_BASE_URL: 'https://backend.movic.sustentabilidadtech.lat',
	GOOGLE_MAPS_API_KEY: process.env['GOOGLE_MAPS_API_KEY']
}
