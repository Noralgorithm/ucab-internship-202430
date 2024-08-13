const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1723549406859 {
	name = 'Migration1723549406859'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" ALTER COLUMN "id" DROP DEFAULT`
		)
	}
}
