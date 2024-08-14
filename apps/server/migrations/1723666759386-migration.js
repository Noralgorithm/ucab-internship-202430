const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1723666759386 {
	name = 'Migration1723666759386'

	async up(queryRunner) {
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
			`CREATE TABLE "users" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(35) NOT NULL, "last_name" character varying(35) NOT NULL, "email" character varying(320) NOT NULL, "encrypted_password" character varying(60) NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "type" "public"."users_type_enum" NOT NULL, "walk_distance" integer NOT NULL DEFAULT '150', "preferred_role" "public"."users_preferred_role_enum" NOT NULL DEFAULT 'passenger', "profile_pic_filename" character varying NOT NULL, "phone_number" character varying NOT NULL, "emergency_contact_phone_number" character varying NOT NULL, "is_driver" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "is_blocked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a3ffb1c0c8416b9fc6f907b7433" UNIQUE ("id"), CONSTRAINT "PK_3e19dae4e05efa137eb87a48b44" PRIMARY KEY ("internal_id"))`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(`DROP TABLE "users"`)
		await queryRunner.query(`DROP TYPE "public"."users_preferred_role_enum"`)
		await queryRunner.query(`DROP TYPE "public"."users_type_enum"`)
		await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`)
	}
}
