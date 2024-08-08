const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1723129849351 {
	name = 'Migration1723129849351'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "walkDistance"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "preferredRole"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicUrl"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`)
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "emergencyContactPhoneNumber"`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDriver"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isBlocked"`)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "first_name" character varying(35) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "last_name" character varying(35) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "walk_distance" integer NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "preferred_role" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "profile_pic_url" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "phone_number" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "emergency_contact_phone_number" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "is_driver" boolean NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT true`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "is_blocked" boolean NOT NULL DEFAULT false`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_blocked"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_driver"`)
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "emergency_contact_phone_number"`
		)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profile_pic_url"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "preferred_role"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "walk_distance"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`)
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "isBlocked" boolean NOT NULL DEFAULT false`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "isDriver" boolean NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "emergencyContactPhoneNumber" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "phoneNumber" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "profilePicUrl" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "preferredRole" character varying NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "walkDistance" integer NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "lastName" character varying(35) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "user" ADD "firstName" character varying(35) NOT NULL`
		)
	}
}
