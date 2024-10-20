const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1729417854405 {
	name = 'Migration1729417854405'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "destinations" ADD "destination_photo_filename" character varying NOT NULL DEFAULT ''`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "destinations" DROP COLUMN "destination_photo_filename"`
		)
	}
}
