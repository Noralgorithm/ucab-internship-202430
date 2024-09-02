import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

config()

const { DATABASE_URL } = process.env

const AppDataSource: DataSource = new DataSource({
	type: 'postgres',
	url: DATABASE_URL,
	entities: ['dist/**/*.entity.js'],
	migrations: ['migrations/*.js'],
	namingStrategy: new SnakeNamingStrategy(),
	synchronize: false,
	logging: true
})

export const getAppDataSource = async () => await AppDataSource.initialize()
