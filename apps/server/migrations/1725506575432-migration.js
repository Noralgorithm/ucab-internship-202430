const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1725506575432 {
	name = 'Migration1725506575432'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "phone_number" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "emergency_contact_phone_number" DROP NOT NULL`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "emergency_contact_phone_number" SET NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "phone_number" SET NOT NULL`
		)
	}
}
