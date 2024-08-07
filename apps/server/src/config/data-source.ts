import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config()

const { DATABASE_URL } = process.env

export const AppDataSource: DataSource = new DataSource({
	type: 'postgres',
	url: DATABASE_URL,
	entities: ['dist/**/*.entity.js'],
	synchronize: false,
	logging: true
})
