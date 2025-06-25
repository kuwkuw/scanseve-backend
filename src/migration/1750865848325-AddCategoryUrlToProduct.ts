import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryUrlToProduct1750865848325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD COLUMN "categoryUrl" varchar NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryUrl"`);
    }

}
