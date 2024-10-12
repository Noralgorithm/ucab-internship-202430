const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1728715549228 {
	name = 'Migration1728715549228'

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TABLE "messages" ("internal_id" SERIAL NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "ride_internal_id" integer, "driver_internal_id" integer, "passenger_internal_id" integer, CONSTRAINT "UQ_18325f38ae6de43878487eff986" UNIQUE ("id"), CONSTRAINT "PK_f144aa824863ee6209585b39485" PRIMARY KEY ("internal_id"))`
		)
		await queryRunner.query(`ALTER TABLE "rides" DROP COLUMN "endpoint"`)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_ffa9ee47a2290d807d922654fb6" FOREIGN KEY ("ride_internal_id") REFERENCES "rides"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_bd21dffb6d395195c61ecba622f" FOREIGN KEY ("driver_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" ADD CONSTRAINT "FK_3a310cb12798bb548acd889da84" FOREIGN KEY ("passenger_internal_id") REFERENCES "users"("internal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_3a310cb12798bb548acd889da84"`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_bd21dffb6d395195c61ecba622f"`
		)
		await queryRunner.query(
			`ALTER TABLE "messages" DROP CONSTRAINT "FK_ffa9ee47a2290d807d922654fb6"`
		)
		await queryRunner.query(
			`ALTER TABLE "rides" ADD "endpoint" character varying NOT NULL`
		)
		await queryRunner.query(`DROP TABLE "messages"`)
	}
}
