const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1727998720025 {
	name = 'Migration1727998720025'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "duration"`)
		await queryRunner.query(
			`ALTER TABLE "routes" ADD "duration" character varying NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "travels" DROP COLUMN "duration"`)
		await queryRunner.query(
			`ALTER TABLE "travels" ADD "duration" character varying NOT NULL`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "travels" DROP COLUMN "duration"`)
		await queryRunner.query(
			`ALTER TABLE "travels" ADD "duration" integer NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "duration"`)
		await queryRunner.query(
			`ALTER TABLE "routes" ADD "duration" integer NOT NULL`
		)
	}
}
