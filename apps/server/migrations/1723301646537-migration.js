const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1723301646537 {
	name = 'Migration1723301646537'

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE "sign_up_request" ("id" uuid NOT NULL, "email" character varying(320) NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cd1c15c23e3d1f0b45bfac90051" UNIQUE ("email"), CONSTRAINT "PK_00564b6045f20b8602d471e7b16" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "uuid"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "internal_id" SERIAL NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "PK_780920bee8edf20701c014cebc7" PRIMARY KEY ("id", "internal_id")`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "encrypted_password" character varying(60) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
		)
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "PK_780920bee8edf20701c014cebc7"`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "PK_8f415738b6b8afd87ebc869829a" PRIMARY KEY ("internal_id")`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`)
		await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL`)
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id")`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`)
		await queryRunner.query(
			`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female')`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "gender" "public"."user_gender_enum" NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`)
		await queryRunner.query(
			`CREATE TYPE "public"."user_type_enum" AS ENUM('staff', 'student', 'professor')`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "type" "public"."user_type_enum" NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "walk_distance" SET DEFAULT '150'`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "preferred_role"`)
		await queryRunner.query(
			`CREATE TYPE "public"."user_preferred_role_enum" AS ENUM('passenger', 'driver')`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "preferred_role" "public"."user_preferred_role_enum" NOT NULL DEFAULT 'passenger'`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "is_driver" SET DEFAULT false`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "is_driver" DROP DEFAULT`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "preferred_role"`)
		await queryRunner.query(`DROP TYPE "public"."user_preferred_role_enum"`)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "preferred_role" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ALTER COLUMN "walk_distance" DROP DEFAULT`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`)
		await queryRunner.query(`DROP TYPE "public"."user_type_enum"`)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "type" character varying NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`)
		await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "gender" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_cace4a159ff9f2512dd42373760"`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`)
		await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`)
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "PK_8f415738b6b8afd87ebc869829a"`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "PK_780920bee8edf20701c014cebc7" PRIMARY KEY ("id", "internal_id")`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`)
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "encrypted_password"`
		)
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "PK_780920bee8edf20701c014cebc7"`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "internal_id"`)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "password" character varying(60) NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "user" ADD "uuid" uuid NOT NULL`)
		await queryRunner.query(`DROP TABLE "sign_up_request"`)
	}
}
