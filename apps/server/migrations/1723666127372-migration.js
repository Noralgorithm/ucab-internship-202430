const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Migration1723666127372 {
	name = 'Migration1723666127372'

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "user" RENAME COLUMN "profile_pic_url" TO "profile_pic_filename"`
		)
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "user" RENAME COLUMN "profile_pic_filename" TO "profile_pic_url"`
		)
	}
}
