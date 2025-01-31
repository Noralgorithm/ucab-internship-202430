import { GoogleAuth } from 'google-auth-library'
import { Auth } from 'googleapis'

export const auth: GoogleAuth = new Auth.GoogleAuth({
	keyFile: 'credentials.json',
	scopes: 'https://www.googleapis.com/auth/spreadsheets'
})
