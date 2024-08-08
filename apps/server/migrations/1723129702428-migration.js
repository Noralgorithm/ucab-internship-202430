const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1723129702428 {
	name = 'Migration1723129702428'

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "firstName" character varying(35) NOT NULL, "lastName" character varying(35) NOT NULL, "email" character varying(320) NOT NULL, "password" character varying(60) NOT NULL, "gender" character varying NOT NULL, "type" character varying NOT NULL, "walkDistance" integer NOT NULL, "preferredRole" character varying NOT NULL, "profilePicUrl" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "emergencyContactPhoneNumber" character varying NOT NULL, "isDriver" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isBlocked" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(`DROP TABLE "user"`)
	}
}
