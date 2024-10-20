const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1729406628033 {
	name = 'Migration1729406628033'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "rides" ALTER COLUMN "is_accepted" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ALTER COLUMN "is_accepted" DROP DEFAULT`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "rides" ALTER COLUMN "is_accepted" SET DEFAULT false`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ALTER COLUMN "is_accepted" SET NOT NULL`
		)
	}
}
