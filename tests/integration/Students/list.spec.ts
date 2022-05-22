import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Student } from "../../../src/entities";
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
    expect(studentList[0]).toHaveProperty("relatives");
  });

  it("should be able to list only one student by id", async () => {
    const studentExample = studentExamples[0];

    const studentRepository = AppDataSource.getRepository(Student);

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
});
