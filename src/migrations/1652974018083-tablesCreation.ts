import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesCreation1652974018083 implements MigrationInterface {
    name = 'tablesCreation1652974018083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email"), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "teacher_id" uuid, CONSTRAINT "REL_99c219ba07a5b221b7ba217166" UNIQUE ("teacher_id"), CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "relative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "phone" character varying(13) NOT NULL, CONSTRAINT "UQ_9f2fc632bc5f713e9294d282d74" UNIQUE ("email"), CONSTRAINT "PK_bb5db663bd141c44a5e1814647b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "birth_date" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "entered_at" TIMESTAMP, "left_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "classroom_id" uuid, CONSTRAINT "REL_a285ca03d7198308720677f531" UNIQUE ("classroom_id"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students_relatives" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "parent_level" character varying(128) NOT NULL, "student_id" uuid, "relative_id" uuid, CONSTRAINT "PK_b8a4eafb7315fed35d2e9b3bb81" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "students_relatives"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "relative"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
    }

}
