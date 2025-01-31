const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1738299015581 {
	name = 'Migration1738299015581'

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE "travel_distance_matrix_per_passengers" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "origin" jsonb NOT NULL, "destination" jsonb NOT NULL, "distance" double precision NOT NULL, "duration" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "travel_internal_id" integer, "passenger_internal_id" integer, CONSTRAINT "UQ_a31ce4367128a03cd7b739ea8ef" UNIQUE ("id"), CONSTRAINT "PK_85294c036db761c7a9737644f16" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "can_ride_at" SET DEFAULT 'NOW()'`
		)
		await queryRunner.query(
			`ALTER TABLE "travel_distance_matrix_per_passengers" ADD CONSTRAINT "FK_d6d69e899c38e7eb39ae8e11c31" FOREIGN KEY ("travel_internal_id") REFERENCES "travels"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "travel_distance_matrix_per_passengers" ADD CONSTRAINT "FK_741b27b8c79decddf78f091e55f" FOREIGN KEY ("passenger_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "travel_distance_matrix_per_passengers" DROP CONSTRAINT "FK_741b27b8c79decddf78f091e55f"`
		)
		await queryRunner.query(
			`ALTER TABLE "travel_distance_matrix_per_passengers" DROP CONSTRAINT "FK_d6d69e899c38e7eb39ae8e11c31"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "can_ride_at" SET DEFAULT '2025-01-22 03:31:40.333425+00'`
		)
		await queryRunner.query(
			`DROP TABLE "travel_distance_matrix_per_passengers"`
		)
	}
}
