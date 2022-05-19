import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesCreation1652813680754 implements MigrationInterface {
    name = 'tablesCreation1652813680754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "teacher_id" uuid, CONSTRAINT "REL_99c219ba07a5b221b7ba217166" UNIQUE ("teacher_id"), CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "relative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "phone" character varying(13) NOT NULL, CONSTRAINT "PK_bb5db663bd141c44a5e1814647b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "birthDate" TIMESTAMP NOT NULL, "address" character varying NOT NULL, "entered_at" TIMESTAMP NOT NULL, "left_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_relatives_relative" ("studentId" uuid NOT NULL, "relativeId" uuid NOT NULL, CONSTRAINT "PK_db8c51beb08ae207cc8a2a43f6f" PRIMARY KEY ("studentId", "relativeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e3567451b24320518eef4c97ad" ON "student_relatives_relative" ("studentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e92ad911bc4bbaeab0ed465ecb" ON "student_relatives_relative" ("relativeId") `);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_99c219ba07a5b221b7ba2171662" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_relatives_relative" ADD CONSTRAINT "FK_e3567451b24320518eef4c97ade" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_relatives_relative" ADD CONSTRAINT "FK_e92ad911bc4bbaeab0ed465ecb6" FOREIGN KEY ("relativeId") REFERENCES "relative"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_relatives_relative" DROP CONSTRAINT "FK_e92ad911bc4bbaeab0ed465ecb6"`);
        await queryRunner.query(`ALTER TABLE "student_relatives_relative" DROP CONSTRAINT "FK_e3567451b24320518eef4c97ade"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_99c219ba07a5b221b7ba2171662"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e92ad911bc4bbaeab0ed465ecb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3567451b24320518eef4c97ad"`);
        await queryRunner.query(`DROP TABLE "student_relatives_relative"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "relative"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
    }

}
