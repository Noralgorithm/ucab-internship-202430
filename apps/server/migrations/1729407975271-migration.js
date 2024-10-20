const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1729407975271 {
	name = 'Migration1729407975271'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "routes" ADD "photo_filename" text NOT NULL`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN "photo_filename"`)
	}
}
