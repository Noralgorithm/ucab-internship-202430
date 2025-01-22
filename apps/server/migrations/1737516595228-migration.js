const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1737516595228 {
	name = 'Migration1737516595228'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "star_rating_as_passenger" double precision`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "reviews_quantity_as_passenger" integer NOT NULL DEFAULT '0'`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "star_rating_as_driver" double precision`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "reviews_quantity_as_driver" integer NOT NULL DEFAULT '0'`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "can_ride_at" SET DEFAULT 'NOW()'`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "can_ride_at" SET DEFAULT '2025-01-20 00:21:27.561601+00'`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "reviews_quantity_as_driver"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "star_rating_as_driver"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "reviews_quantity_as_passenger"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "star_rating_as_passenger"`
		)
	}
}
