import { expect, describe, it, beforeAll, afterAll } from "@jest/globals";
import { DataSource } from "typeorm";
import { dbConnect, dbDestroy, populateDb } from "../../helpers/dbHandler";
import request from "supertest";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Teacher } from "../../../src/entities/Teacher";
import { teacherExamples } from "../../fixtures/teachers";

let connection: DataSource;

beforeAll(async () => {
  const db = await dbConnect();

  if (db) connection = db;

  await populateDb();
});

afterAll(async () => {
  await dbDestroy(connection);
});

describe("Testing teachers deletion", () => {
  it("should be able to delete one teacher", async () => {
    const teacherExample = teacherExamples[0];

    const teacherRepository = AppDataSource.getRepository(Teacher);

    const teacher = await teacherRepository.findOneBy({
      email: teacherExample.email,
    });

    if (teacher) {
      const response = await request(app).delete(`/teachers/${teacher.id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBeDefined();

      const entityLength = await teacherRepository.count();

      expect(entityLength).toBe(3);
    }
  });

  it("should not be able to list a false id", async () => {
    const response = await request(app).delete("/teachers/5");

    expect(response.statusCode).toBe(400);
    expect(response.body).toBeUndefined();
  });
});
