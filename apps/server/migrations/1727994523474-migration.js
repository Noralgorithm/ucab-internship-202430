const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1727994523474 {
	name = 'Migration1727994523474'

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE "destinations" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_internal_id" integer, CONSTRAINT "UQ_69c5e8db964dcb83d3a0640f3c7" UNIQUE ("id"), CONSTRAINT "PK_987e972a4404229561ffc0fec95" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."routes_type_enum" AS ENUM('to-ucab', 'from-ucab')`
		)
		await queryRunner.query(
			`CREATE TABLE "routes" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."routes_type_enum" NOT NULL, "distance" integer NOT NULL, "duration" integer NOT NULL, "description" character varying NOT NULL, "geo_json_line_string" jsonb NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_internal_id" integer, CONSTRAINT "UQ_76100511cdfa1d013c859f01d8b" UNIQUE ("id"), CONSTRAINT "PK_daff8f689188f33f60f7f54cd29" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female')`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."users_type_enum" AS ENUM('staff', 'student', 'professor')`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."users_preferred_role_enum" AS ENUM('passenger', 'driver')`
		)
		await queryRunner.query(
			`CREATE TABLE "users" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(35) NOT NULL, "last_name" character varying(35) NOT NULL, "email" character varying(320) NOT NULL, "encrypted_password" character varying(60) NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "type" "public"."users_type_enum" NOT NULL, "walk_distance" integer NOT NULL DEFAULT '150', "preferred_role" "public"."users_preferred_role_enum" NOT NULL DEFAULT 'passenger', "profile_pic_filename" character varying NOT NULL, "phone_number" character varying, "emergency_contact_phone_number" character varying, "is_driver" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "is_blocked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433" UNIQUE ("id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_3e19dae4e05efa137eb87a48b44" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_c5efd7db748b536d6a8bfa8ffc" ON "users" ("email", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_b31ce62da07f526c31e5cfaac7" ON "users" ("id", "deleted_at") `
		)
		await queryRunner.query(
			`CREATE TYPE "public"."rides_travel_cancel_type_enum" AS ENUM('passenger-denial', 'driver-denial')`
		)
		await queryRunner.query(
			`CREATE TABLE "rides" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "endpoint" character varying NOT NULL, "is_accepted" boolean NOT NULL DEFAULT false, "arrival_time" TIMESTAMP WITH TIME ZONE NOT NULL, "star_rating" double precision, "took_the_ride" boolean DEFAULT false, "meeting_point" character varying, "cancellation_reason" character varying, "travel_cancel_type" "public"."rides_travel_cancel_type_enum", "passenger_star_rating" integer NOT NULL, "driver_star_rating" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "passenger_internal_id" integer, "travel_internal_id" integer, CONSTRAINT "UQ_ca6f62fc1e999b139c7f28f07fd" UNIQUE ("id"), CONSTRAINT "PK_5d6e8a7ec39eac512404d10be88" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."travels_type_enum" AS ENUM('to-ucab', 'from-ucab')`
		)
		await queryRunner.query(
			`CREATE TYPE "public"."travels_status_enum" AS ENUM('not-started', 'in-progress', 'completed', 'cancelled')`
		)
		await queryRunner.query(
			`CREATE TABLE "travels" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "distance" integer NOT NULL, "duration" integer NOT NULL, "description" character varying NOT NULL, "geo_json_line_string" jsonb NOT NULL, "endpoint" character varying NOT NULL, "departure_time" TIMESTAMP WITH TIME ZONE NOT NULL, "arrival_time" TIMESTAMP WITH TIME ZONE NOT NULL, "for_women" boolean NOT NULL DEFAULT false, "type" "public"."travels_type_enum" NOT NULL DEFAULT 'from-ucab', "status" "public"."travels_status_enum" NOT NULL DEFAULT 'not-started', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "available_seat_quantity" smallint NOT NULL, "vehicle_internal_id" integer, CONSTRAINT "UQ_cc2d44f93ba8f6b268978971e2b" UNIQUE ("id"), CONSTRAINT "PK_a7a9fdf0976f8e0f13ca73c49ff" PRIMARY KEY ("internal_id"))`
		)
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
			`CREATE TABLE "sign_up_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(320) NOT NULL, "expiration_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_cd1c15c23e3d1f0b45bfac90051" UNIQUE ("email"), CONSTRAINT "PK_00564b6045f20b8602d471e7b16" PRIMARY KEY ("id"))`
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
			`ALTER TABLE "rides" ADD CONSTRAINT "FK_baff3842239d0d0be9b0cda6a1d" FOREIGN KEY ("travel_internal_id") REFERENCES "travels"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "travels" ADD CONSTRAINT "FK_31716ad0e3452bb59ed60a85ddd" FOREIGN KEY ("vehicle_internal_id") REFERENCES "vehicles"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
			`ALTER TABLE "travels" DROP CONSTRAINT "FK_31716ad0e3452bb59ed60a85ddd"`
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
		await queryRunner.query(`DROP TABLE "sign_up_request"`)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_26816e99720827d647d0a57a71"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_bd1f2683cb3f6e66634e2c4c4a"`
		)
		await queryRunner.query(`DROP TABLE "vehicles"`)
		await queryRunner.query(`DROP TABLE "travels"`)
		await queryRunner.query(`DROP TYPE "public"."travels_status_enum"`)
		await queryRunner.query(`DROP TYPE "public"."travels_type_enum"`)
		await queryRunner.query(`DROP TABLE "rides"`)
		await queryRunner.query(
			`DROP TYPE "public"."rides_travel_cancel_type_enum"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_b31ce62da07f526c31e5cfaac7"`
		)
		await queryRunner.query(
			`DROP INDEX "public"."IDX_c5efd7db748b536d6a8bfa8ffc"`
		)
		await queryRunner.query(`DROP TABLE "users"`)
		await queryRunner.query(`DROP TYPE "public"."users_preferred_role_enum"`)
		await queryRunner.query(`DROP TYPE "public"."users_type_enum"`)
		await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`)
		await queryRunner.query(`DROP TABLE "routes"`)
		await queryRunner.query(`DROP TYPE "public"."routes_type_enum"`)
		await queryRunner.query(`DROP TABLE "destinations"`)
	}
}
