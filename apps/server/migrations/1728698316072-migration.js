const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1728698316072 {
	name = 'Migration1728698316072'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "travels" DROP COLUMN "endpoint"`)
		await queryRunner.query(`ALTER TABLE "travels" ADD "origin" jsonb NOT NULL`)
		await queryRunner.query(
			`ALTER TABLE "travels" ADD "destination" jsonb NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "rides" ADD "origin" jsonb NOT NULL`)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "destination" jsonb NOT NULL`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "destination"`)
		await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "origin"`)
		await queryRunner.query(`ALTER TABLE "travels" DROP COLUMN "destination"`)
		await queryRunner.query(`ALTER TABLE "travels" DROP COLUMN "origin"`)
		await queryRunner.query(
			`ALTER TABLE "travels" ADD "endpoint" character varying NOT NULL`
		)
	}
}
