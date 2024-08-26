const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1724620267626 {
	name = 'Migration1724620267626'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_c5efd7db748b536d6a8bfa8ffc" ON "users" ("email", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_b31ce62da07f526c31e5cfaac7" ON "users" ("id", "deleted_at") `
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`DROP INDEX "public"."IDX_b31ce62da07f526c31e5cfaac7"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_c5efd7db748b536d6a8bfa8ffc"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
		)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`)
	}
}
