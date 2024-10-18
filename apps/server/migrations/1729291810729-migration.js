const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1729291810729 {
	name = 'Migration1729291810729'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_bd21dffb6d395195c61ecba622f"`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_3a310cb12798bb548acd889da84"`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" DROP COLUMN "driver_internal_id"`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" DROP COLUMN "passenger_internal_id"`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD "sender_internal_id" integer`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_43ebb533e9eb0b5e51f4e038ef2" FOREIGN KEY ("sender_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_43ebb533e9eb0b5e51f4e038ef2"`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" DROP COLUMN "sender_internal_id"`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD "passenger_internal_id" integer`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD "driver_internal_id" integer`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_3a310cb12798bb548acd889da84" FOREIGN KEY ("passenger_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_bd21dffb6d395195c61ecba622f" FOREIGN KEY ("driver_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}
}
