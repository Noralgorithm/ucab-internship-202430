const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1726365066949 {
	name = 'Migration1726365066949'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_87ce1dbd274cff22632eaba80a1"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_bd1f2683cb3f6e66634e2c4c4a"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_26816e99720827d647d0a57a71"`
		)
		await queryRunner.query(
			`CREATE TABLE "destinations" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "endpoint" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_internal_id" integer, CONSTRAINT "UQ_69c5e8db964dcb83d3a0640f3c7" UNIQUE ("id"), CONSTRAINT "PK_987e972a4404229561ffc0fec95" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."routes_type_enum" AS ENUM('to-ucab', 'from-ucab')`
		)
		await queryRunner.query(
			`CREATE TABLE "routes" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "route" character varying NOT NULL, "type" "public"."routes_type_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_internal_id" integer, CONSTRAINT "UQ_76100511cdfa1d013c859f01d8b" UNIQUE ("id"), CONSTRAINT "PK_daff8f689188f33f60f7f54cd29" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."rides_travel_cancel_type_enum" AS ENUM('passenger-denial', 'driver-denial')`
		)
		await queryRunner.query(
			`CREATE TABLE "rides" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "endpoint" character varying NOT NULL, "is_accepted" boolean NOT NULL DEFAULT false, "arrival_time" TIMESTAMP WITH TIME ZONE NOT NULL, "star_rating" double precision, "took_the_ride" boolean DEFAULT false, "meeting_point" character varying, "cancellation_reason" character varying, "travel_cancel_type" "public"."rides_travel_cancel_type_enum", "passenger_star_rating" integer NOT NULL, "driver_star_rating" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "passenger_internal_id" integer, "travel_internal_id" integer, CONSTRAINT "UQ_ca6f62fc1e999b139c7f28f07fd" UNIQUE ("id"), CONSTRAINT "PK_5d6e8a7ec39eac512404d10be88" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_ec7181ebdab798d97070122a5bf"`
		)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "plate"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "brand"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "color"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "model"`)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP COLUMN "seat_quantity"`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP COLUMN "driver_internal_id"`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "route" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "endpoint" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "departure_time" TIMESTAMP WITH TIME ZONE NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "arrival_time" TIMESTAMP WITH TIME ZONE NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "for_women" boolean NOT NULL DEFAULT false`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."vehicles_type_enum" AS ENUM('to-ucab', 'from-ucab')`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "type" "public"."vehicles_type_enum" NOT NULL DEFAULT 'from-ucab'`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."vehicles_status_enum" AS ENUM('not-started', 'in-progress', 'completed', 'cancelled')`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "status" "public"."vehicles_status_enum" NOT NULL DEFAULT 'not-started'`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "available_seat_quantity" smallint NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "vehicle_internal_id" integer`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "plate" character varying(7) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_ec7181ebdab798d97070122a5bf" UNIQUE ("plate")`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "brand" character varying(100) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "color" character varying(100) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "model" character varying(100) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "seat_quantity" smallint NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "driver_internal_id" integer`
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_bd1f2683cb3f6e66634e2c4c4a" ON "vehicles" ("plate", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_26816e99720827d647d0a57a71" ON "vehicles" ("id", "deleted_at") `
		)
		await queryRunner.query(
			`ALTER TABLE "destinations" ADD CONSTRAINT "FK_90fb103a5780b3269f1ae738e33" FOREIGN KEY ("user_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "routes" ADD CONSTRAINT "FK_6046602131a0dd66c1ff0b3a99a" FOREIGN KEY ("user_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD CONSTRAINT "FK_e64d464618afb71ff456c53b76e" FOREIGN KEY ("passenger_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD CONSTRAINT "FK_baff3842239d0d0be9b0cda6a1d" FOREIGN KEY ("travel_internal_id") REFERENCES "vehicles"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_257b6ed9d058b93a7bd96ee4f6c" FOREIGN KEY ("vehicle_internal_id") REFERENCES "vehicles"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
			`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_257b6ed9d058b93a7bd96ee4f6c"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" DROP CONSTRAINT "FK_baff3842239d0d0be9b0cda6a1d"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" DROP CONSTRAINT "FK_e64d464618afb71ff456c53b76e"`
		)
		await queryRunner.query(
			`ALTER TABLE "routes" DROP CONSTRAINT "FK_6046602131a0dd66c1ff0b3a99a"`
		)
		await queryRunner.query(
			`ALTER TABLE "destinations" DROP CONSTRAINT "FK_90fb103a5780b3269f1ae738e33"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_26816e99720827d647d0a57a71"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_bd1f2683cb3f6e66634e2c4c4a"`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP COLUMN "driver_internal_id"`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP COLUMN "seat_quantity"`
		)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "model"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "color"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "brand"`)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP CONSTRAINT "UQ_ec7181ebdab798d97070122a5bf"`
		)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "plate"`)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP COLUMN "vehicle_internal_id"`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP COLUMN "available_seat_quantity"`
		)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "status"`)
		await queryRunner.query(`DROP TYPE "public"."vehicles_status_enum"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "type"`)
		await queryRunner.query(`DROP TYPE "public"."vehicles_type_enum"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "for_women"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "arrival_time"`)
		await queryRunner.query(
			`ALTER TABLE "vehicles" DROP COLUMN "departure_time"`
		)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "endpoint"`)
		await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "route"`)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "driver_internal_id" integer`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "seat_quantity" smallint NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "model" character varying(100) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "color" character varying(100) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "brand" character varying(100) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD "plate" character varying(7) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD CONSTRAINT "UQ_ec7181ebdab798d97070122a5bf" UNIQUE ("plate")`
		)
		await queryRunner.query(`DROP TABLE "rides"`)
		await queryRunner.query(
			`DROP TYPE "public"."rides_travel_cancel_type_enum"`
		)
		await queryRunner.query(`DROP TABLE "routes"`)
		await queryRunner.query(`DROP TYPE "public"."routes_type_enum"`)
		await queryRunner.query(`DROP TABLE "destinations"`)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_26816e99720827d647d0a57a71" ON "vehicles" ("id", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_bd1f2683cb3f6e66634e2c4c4a" ON "vehicles" ("plate", "deleted_at") `
		)
		await queryRunner.query(
			`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_87ce1dbd274cff22632eaba80a1" FOREIGN KEY ("driver_internal_id") REFERENCES "users"("internal_id") ON DELETE CASCADE ON UPDATE CASCADE`
		)
	}
}
