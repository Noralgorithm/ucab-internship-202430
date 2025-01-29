import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type Auth, sheets_v4 } from 'googleapis'
import { auth } from '~/shared/utils/google-apis-connection'

export interface SheetRow {
	registeredAt: string
	email: string
}

@Injectable()
export class WhitelistProvider {
	constructor(private readonly configService: ConfigService) {}

	async getWhitelist() {
		const googleSheets = await this.connectToGoogleSheets()

		const rows = await this.getSpreadsheetRows(googleSheets)

		return rows
	}

	private async connectToGoogleSheets() {
		const client = await auth.getClient()

		const googleSheets = new sheets_v4.Sheets({
			auth: client as Auth.OAuth2Client
		})

		return googleSheets
	}

	private async getSpreadsheetRows(
		googleSheets: sheets_v4.Sheets
	): Promise<SheetRow[]> {
		const getRows = await googleSheets.spreadsheets.values.get({
			auth,
			spreadsheetId: this.configService.get('SPREADSHEET_ID'),
			range: this.configService.get('SHEET_NAME')
		})

		if (!getRows.data.values) {
			return []
		}

		const rows: SheetRow[] = getRows.data.values.slice(1).map((row) => ({
			registeredAt: row[0],
			email: row[1]
		}))

		return rows
	}

	private async findByRowEmail(
		email: string,
		rows: SheetRow[]
	): Promise<SheetRow | undefined> {
		return rows.find((row) => row.email === email)
	}

	// TODO: Implement this for activating/deactivating users
	// NOTE: THIS IS NOT WORKING YET
	private async updateActivation(
		affectedRowNumber: string,
		googleSheets: sheets_v4.Sheets,
		participationDay: string
	) {
		await googleSheets.spreadsheets.values.update({
			spreadsheetId: this.configService.get('SPREADSHEET_ID'),
			range: `${this.configService.get('SHEET_NAME')}!${participationDay}${affectedRowNumber}`,
			valueInputOption: 'USER_ENTERED',
			requestBody: {
				values: [[true]]
			}
		})
	}
}
