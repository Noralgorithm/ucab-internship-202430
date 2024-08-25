const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1724625062674 {
	name = 'Migration1724625062674'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" DROP COLUMN "expiration_date"`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" ADD "expiration_date" TIMESTAMP WITH TIME ZONE NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" DROP COLUMN "created_at"`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" DROP COLUMN "updated_at"`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_c5efd7db748b536d6a8bfa8ffc"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_b31ce62da07f526c31e5cfaac7"`
		)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
		)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
		)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`
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
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`)
		await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
		)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_b31ce62da07f526c31e5cfaac7" ON "users" ("id", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_c5efd7db748b536d6a8bfa8ffc" ON "users" ("email", "deleted_at") `
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" DROP COLUMN "updated_at"`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" DROP COLUMN "created_at"`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" DROP COLUMN "expiration_date"`
		)
		await queryRunner.query(
			`ALTER TABLE "sign_up_request" ADD "expiration_date" TIMESTAMP NOT NULL`
		)
	}
}
