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

describe("Testing teachers list", () => {
  it("should be able to list all teachers", async () => {
    const response = await request(app)
      .get("/teachers")
      .set("Authorization", token);
    const teachersList = response.body;

    expect(response.statusCode).toBe(200);
    expect(teachersList).toHaveLength(4);

    expect(teachersList[0]).toHaveProperty("id");
    expect(teachersList[0]).toHaveProperty("name");
    expect(teachersList[0]).toHaveProperty("email");
  });
  it("should be able to list only one teacher by id", async () => {
    const teacherExample = teacherExamples[0];

    const teacherRepository = AppDataSource.getRepository(Teacher);

    const teacherToVerify = await teacherRepository.findOneBy({
      email: teacherExample.email,
    });

    if (teacherToVerify) {
      const response = await request(app)
        .get(`/teachers/${teacherToVerify.id}`)
        .set("Authorization", token);
      const teacher = response.body;

      expect(response.statusCode).toBe(200);
      expect(teacher).toMatchObject({ ...teacherToVerify });
    }
  });
});
