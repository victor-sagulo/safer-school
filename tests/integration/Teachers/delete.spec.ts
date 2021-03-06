import { expect, describe, it, beforeAll, afterAll } from "@jest/globals";
import { DataSource } from "typeorm";
import {
  dbConnect,
  dbDestroy,
  loginAdm,
  populateDb,
} from "../../helpers/dbHandler";
import request from "supertest";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Teacher } from "../../../src/entities/Teacher";
import { teacherExamples } from "../../fixtures/teachers";

let connection: DataSource;
let token: string;

beforeAll(async () => {
  const db = await dbConnect();

  if (db) connection = db;

  token = await loginAdm();

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
      const oldEntityLength = await teacherRepository.count();

      const response = await request(app)
        .delete(`/teachers/${teacher.id}`)
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);

      const entityLength = await teacherRepository.count();

      expect(entityLength).toBe(oldEntityLength - 1);
    }
  });

  it("should not be able to delete a false id", async () => {
    const response = await request(app)
      .delete("/teachers/2b133b1b-97dd-4e3d-a8d8-e86da085f43f")
      .set("Authorization", token);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Teacher not found or doesn't exists");
    expect(response.body.status).toBe("error");
  });

  it("should not be able to delete a invalid id (not uuid)", async () => {
    const response = await request(app)
      .delete("/teachers/5")
      .set("Authorization", token);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid id");
    expect(response.body.status).toBe("error");
  });
});
