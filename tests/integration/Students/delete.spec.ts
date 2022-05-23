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

describe("Testing students deletion", () => {
  it("should be able to delete one student", async () => {
    const studentExample = studentExamples[0];

    const studentRepository = AppDataSource.getRepository(Student);

    const student = await studentRepository.findOneBy({
      name: studentExample.name,
    });

    const oldEntityLength = await studentRepository.count();

    const response = await request(app).delete(`/students/${student?.id}`);

    expect(response.statusCode).toBe(204);

    const entityLength = await studentRepository.count();

    expect(entityLength).toBe(oldEntityLength - 1);
  });

  it("should not be able to delete a false id", async () => {
    const response = await request(app).delete(
      "/students/2b133b1b-97dd-4e3d-a8d8-e86da085f43f"
    );

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Student not found or doesn't exists");
    expect(response.body.status).toBe("error");
  });

  it("should not be able to delete a invalid id (not uuid)", async () => {
    const response = await request(app).delete("/students/5");

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid id");
    expect(response.body.status).toBe("error");
  });
});
