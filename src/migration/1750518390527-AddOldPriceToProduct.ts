import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOldPriceToProduct1750518390527 implements MigrationInterface {
    name = 'AddOldPriceToProduct1750518390527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "oldPrice" decimal NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "imageUrl" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "category" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "lastUpdated" TIMESTAMP NULL`);
        await queryRunner.query(`UPDATE "product" SET "lastUpdated" = NOW() WHERE "lastUpdated" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "lastUpdated" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "product_url" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "product_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "lastUpdated"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "oldPrice"`);
    }
}
