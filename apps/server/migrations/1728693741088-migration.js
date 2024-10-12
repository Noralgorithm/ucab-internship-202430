const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1728693741088 {
	name = 'Migration1728693741088'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "star_rating"`)
		await queryRunner.query(
			`ALTER TABLE "destinations" ADD "destination_pic_filename" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ALTER COLUMN "arrival_time" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ALTER COLUMN "took_the_ride" SET NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "meeting_point"`)
		await queryRunner.query(`ALTER TABLE "rides" ADD "meeting_point" jsonb`)
		await queryRunner.query(
			`ALTER TABLE "rides" DROP COLUMN "passenger_star_rating"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "passenger_star_rating" double precision`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" DROP COLUMN "driver_star_rating"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "driver_star_rating" double precision`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "rides" DROP COLUMN "driver_star_rating"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "driver_star_rating" integer NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" DROP COLUMN "passenger_star_rating"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "passenger_star_rating" integer NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "meeting_point"`)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "meeting_point" character varying`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ALTER COLUMN "took_the_ride" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ALTER COLUMN "arrival_time" SET NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "destinations" DROP COLUMN "destination_pic_filename"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "star_rating" double precision`
		)
	}
}
