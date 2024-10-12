const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1728694172552 {
	name = 'Migration1728694172552'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "destinations" DROP COLUMN "destination_pic_filename"`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "destinations" ADD "destination_pic_filename" character varying NOT NULL`
		)
	}
}
