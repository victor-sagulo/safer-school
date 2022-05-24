import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Relative, Student, StudentsRelatives } from "../../../src/entities";
import { studentExamples } from "../../fixtures/students";
import { dbConnect, dbDestroy, populateDb } from "../../helpers/dbHandler";

let connection: DataSource;

beforeAll(async () => {
  const db = await dbConnect();

  if (db) connection = db;

  await populateDb();
});

afterAll(async () => {
  await dbDestroy(connection);
});

describe("Testing students list", () => {
  const studentRepository = AppDataSource.getRepository(Student);
  const studentRelativesRepository =
    AppDataSource.getRepository(StudentsRelatives);

  it("should be able to list all students", async () => {
    const response = await request(app).get("/students");
    const studentList = response.body;

    expect(response.statusCode).toBe(200);
    expect(studentList).toHaveLength(4);

    expect(studentList[0]).toHaveProperty("id");
    expect(studentList[0]).toHaveProperty("name");
    expect(studentList[0]).toHaveProperty("address");
    expect(studentList[0]).toHaveProperty("birthDate");
    expect(studentList[0]).toHaveProperty("enteredAt");
    expect(studentList[0]).toHaveProperty("leftAt");
    expect(studentList[0]).toHaveProperty("createdAt");
  });

  it("should be able to list only one student by id", async () => {
    const studentExample = studentExamples[0];

    const studentToVerify = await studentRepository.findOneBy({
      name: studentExample.name,
    });

    if (studentToVerify) {
      studentToVerify.createdAt =
        studentToVerify?.createdAt.toISOString() as unknown as Date;
      studentToVerify.birthDate =
        studentToVerify?.birthDate.toISOString() as unknown as Date;
    }

    const response = await request(app).get(`/students/${studentToVerify?.id}`);

    const student = response.body;

    expect(response.statusCode).toBe(200);
    expect(student).toMatchObject({ ...studentToVerify });
  });

  it("should be able to list all relatives of one student by id", async () => {
    const studentExample = studentExamples[2];

    const studentToVerify = await studentRepository.findOneBy({
      name: studentExample.name,
    });

    const studentRelativeExample = await studentRelativesRepository
      .createQueryBuilder("relation")
      .innerJoinAndSelect("relation.studentId", "student")
      .innerJoinAndSelect("relation.relativeId", "relative")
      .where("relation.student_id = :studentId", {
        studentId: studentToVerify?.id,
      })
      .getMany();

    const response = await request(app).get(
      `/students/relatives/${studentToVerify?.id}`
    );
    const relativeList: { parentLevel: string; relative: Relative[] }[] =
      response.body.relatives;

    const student = response.body.student;

    expect(student).toHaveProperty("id");
    expect(student).toHaveProperty("name");
    expect(student).toHaveProperty("address");
    expect(student).toHaveProperty("birthDate");
    expect(student).toHaveProperty("enteredAt");
    expect(student).toHaveProperty("leftAt");
    expect(student).toHaveProperty("createdAt");
    expect(response.statusCode).toBe(200);
    expect(relativeList).toHaveLength(1);

    relativeList.forEach(({ relative }, index) => {
      expect(relative).toMatchObject({
        ...studentRelativeExample[index]?.relativeId,
      });
    });
  });
});
