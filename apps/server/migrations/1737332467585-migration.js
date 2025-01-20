const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1737332467585 {
	name = 'Migration1737332467585'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "can_ride_at" SET DEFAULT 'NOW()'`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_26816e99720827d647d0a57a71"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_bd1f2683cb3f6e66634e2c4c4a"`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_18d8646b59304dce4af3a9e35b6"`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_ec7181ebdab798d97070122a5bf"`
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_bd1f2683cb3f6e66634e2c4c4a" ON "vehicles" ("plate", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_26816e99720827d647d0a57a71" ON "vehicles" ("id", "deleted_at") `
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`DROP INDEX "public"."IDX_26816e99720827d647d0a57a71"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_bd1f2683cb3f6e66634e2c4c4a"`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_ec7181ebdab798d97070122a5bf" UNIQUE ("plate")`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_18d8646b59304dce4af3a9e35b6" UNIQUE ("id")`
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_bd1f2683cb3f6e66634e2c4c4a" ON "vehicles" ("plate", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_26816e99720827d647d0a57a71" ON "vehicles" ("id", "deleted_at") `
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "can_ride_at" SET DEFAULT '2024-11-28 09:11:34.991797+00'`
		)
	}
}
