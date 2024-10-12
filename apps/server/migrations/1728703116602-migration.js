const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1728703116602 {
	name = 'Migration1728703116602'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "travels" ALTER COLUMN "departure_time" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "travels" ALTER COLUMN "arrival_time" DROP NOT NULL`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "travels" ALTER COLUMN "arrival_time" SET NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "travels" ALTER COLUMN "departure_time" SET NOT NULL`
		)
	}
}
