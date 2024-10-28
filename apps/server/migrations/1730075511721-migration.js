const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1730075511721 {
	name = 'Migration1730075511721'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "rides" ADD "drop_off" jsonb`)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "passenger_comment_after_ride" character varying`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "driver_comment_after_ride" character varying`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "rides" DROP COLUMN "driver_comment_after_ride"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" DROP COLUMN "passenger_comment_after_ride"`
		)
		await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "drop_off"`)
	}
}
