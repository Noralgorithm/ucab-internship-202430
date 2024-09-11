const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1726019446518 {
	name = 'Migration1726019446518'

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE "vehicles" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plate" character varying(7) NOT NULL, "brand" character varying(100) NOT NULL, "color" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "seat_quantity" smallint NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "driver_internal_id" integer, CONSTRAINT "UQ_18d8646b59304dce4af3a9e35b6" UNIQUE ("id"), CONSTRAINT "UQ_ec7181ebdab798d97070122a5bf" UNIQUE ("plate"), CONSTRAINT "PK_bba01932ca484152265d5bdaca1" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_bd1f2683cb3f6e66634e2c4c4a" ON "vehicles" ("plate", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_26816e99720827d647d0a57a71" ON "vehicles" ("id", "deleted_at") `
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_87ce1dbd274cff22632eaba80a1" FOREIGN KEY ("driver_internal_id") REFERENCES "users"("internal_id") ON DELETE CASCADE ON UPDATE CASCADE`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_87ce1dbd274cff22632eaba80a1"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_26816e99720827d647d0a57a71"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_bd1f2683cb3f6e66634e2c4c4a"`
		)
		await queryRunner.query(`DROP TABLE "vehicles"`)
	}
}
