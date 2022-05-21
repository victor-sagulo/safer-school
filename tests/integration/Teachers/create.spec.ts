import { expect, describe, it, beforeAll, afterAll } from "@jest/globals";
import { DataSource } from "typeorm";
import { dbConnect, dbDestroy, populateDb } from "../../helpers/dbHandler";
import request from "supertest";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Teacher } from "../../../src/entities/Teacher";

let connection: DataSource;

const teacherExample = {
  name: "Maria Paula Silva",
  email: "paulinha@yahoo.com.br",
};

const teacherSameEmail = {
  name: "Paula Abreu",
  email: "paulinha@yahoo.com.br",
};

beforeAll(async () => {
  const db = await dbConnect();

  if (db) connection = db;

  await populateDb();
});

afterAll(async () => {
  await dbDestroy(connection);
});

describe("Testing teachers creation", () => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  it("should be able to create a new teacher", async () => {
    const response = await request(app).post("/teachers").send(teacherExample);

    const teacherCreated = response.body;

    expect(response.statusCode).toBe(201);
    expect(typeof teacherCreated.id).toBe("string");
    expect(teacherCreated.name).toBe(teacherExample.name);
    expect(teacherCreated.email).toBe(teacherExample.email);

    const teacherFromDb = await teacherRepository.findOneBy({
      email: teacherExample.email,
    });

    if (teacherFromDb) {
      expect(teacherFromDb.id).toBe(teacherCreated.id);
      expect(teacherFromDb.name).toBe(teacherCreated.name);
      expect(teacherFromDb.email).toBe(teacherCreated.email);
    }
  });

  it("should not be able to create two teachers with same email", async () => {
    const response = await request(app)
      .post("/teachers")
      .send(teacherSameEmail);

    expect(response.statusCode).toBe(409);
    expect(response.body.id).toBeUndefined();
    expect(response.body.message).toBe("This email already exists");
    expect(response.body.status).toBe("err");

    const countTeachers = await teacherRepository.countBy({
      email: teacherSameEmail.email,
    });

    expect(countTeachers).toBe(1);
  });
});
