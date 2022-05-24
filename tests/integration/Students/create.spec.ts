import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Student } from "../../../src/entities";
import { dbConnect, dbDestroy, populateDb } from "../../helpers/dbHandler";

let connection: DataSource;

const studentExample = {
  name: "Mario Maria",
  birthDate: new Date(20006, 7, 10),
  address: "Logo ali, 0",
};

const studentWithoutBirthDate = {
  name: "Paulo André",
  address: "Onde você quiser, 100",
};

beforeAll(async () => {
  const db = await dbConnect();

  if (db) connection = db;

  await populateDb();
});

afterAll(async () => {
  await dbDestroy(connection);
});

describe("Testing students creation", () => {
  const studentRepository = AppDataSource.getRepository(Student);

  it("should be able to create a new student", async () => {
    const response = await request(app).post("/students").send(studentExample);

    const studentCreated = response.body;

    expect(response.statusCode).toBe(201);
    expect(typeof studentCreated.id).toBe("string");
    expect(studentCreated.name).toBe(studentExample.name);
    expect(studentCreated.birthDate).toBe(
      studentExample.birthDate.toISOString()
    );
    expect(studentCreated.address).toBe(studentExample.address);

    const teacherFromDb = await studentRepository.findOneBy({
      name: studentExample.name,
    });

    expect(teacherFromDb?.id).toBe(studentCreated.id);
    expect(teacherFromDb?.name).toBe(studentCreated.name);
    expect(teacherFromDb?.birthDate.toISOString()).toBe(
      studentCreated.birthDate
    );
    expect(teacherFromDb?.address).toBe(studentCreated.address);

    const countTeachers = await studentRepository.countBy({
      name: studentCreated.name,
    });

    expect(countTeachers).toBe(1);
  });

  it("should not be able to create a student without a birthDate", async () => {
    const response = await request(app)
      .post("/students")
      .send(studentWithoutBirthDate);

    expect(response.statusCode).toBe(400);
    expect(response.body.id).toBeUndefined();
    expect(response.body.message).toBe(
      "You need to provide a birth date to register a student"
    );
    expect(response.body.status).toBe("error");

    const countTeachers = await studentRepository.countBy({
      name: studentWithoutBirthDate.name,
    });

    expect(countTeachers).toBe(0);
  });
});
