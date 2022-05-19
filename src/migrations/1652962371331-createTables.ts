import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1652962371331 implements MigrationInterface {
    name = 'createTables1652962371331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_99c219ba07a5b221b7ba2171662"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_a285ca03d7198308720677f5315"`);
        await queryRunner.query(`ALTER TABLE "students_relatives" DROP CONSTRAINT "FK_e2291837202e7e2af73443d7cf1"`);
        await queryRunner.query(`ALTER TABLE "students_relatives" DROP CONSTRAINT "FK_27f5308f464c1bebc8b4cb0ecdc"`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_99c219ba07a5b221b7ba2171662" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_a285ca03d7198308720677f5315" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_relatives" ADD CONSTRAINT "FK_e2291837202e7e2af73443d7cf1" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_relatives" ADD CONSTRAINT "FK_27f5308f464c1bebc8b4cb0ecdc" FOREIGN KEY ("relative_id") REFERENCES "relative"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students_relatives" DROP CONSTRAINT "FK_27f5308f464c1bebc8b4cb0ecdc"`);
        await queryRunner.query(`ALTER TABLE "students_relatives" DROP CONSTRAINT "FK_e2291837202e7e2af73443d7cf1"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_a285ca03d7198308720677f5315"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_99c219ba07a5b221b7ba2171662"`);
        await queryRunner.query(`ALTER TABLE "students_relatives" ADD CONSTRAINT "FK_27f5308f464c1bebc8b4cb0ecdc" FOREIGN KEY ("relative_id") REFERENCES "relative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_relatives" ADD CONSTRAINT "FK_e2291837202e7e2af73443d7cf1" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_a285ca03d7198308720677f5315" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_99c219ba07a5b221b7ba2171662" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
