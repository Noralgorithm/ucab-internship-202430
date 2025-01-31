const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1738303482109 {
	name = 'Migration1738303482109'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "total_star_rating" double precision`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "total_reviews_quantity" integer NOT NULL DEFAULT '0'`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "can_ride_at" SET DEFAULT 'NOW()'`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "can_ride_at" SET DEFAULT '2025-01-31 04:55:10.654494+00'`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "total_reviews_quantity"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "total_star_rating"`
		)
	}
}
