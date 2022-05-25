import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Classroom } from "../../../src/entities";
import {
  dbConnect,
  dbDestroy,
  loginAdm,
  populateDb,
} from "../../helpers/dbHandler";

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

describe("Testing classroom list", () => {
  it("Should be able to list all classrooms ", async () => {
    const response = await request(app)
      .get("/classroom")
      .set("Authorization", token);

    const classroomList: Classroom[] = response.body;

    expect(response.statusCode).toBe(200);

    expect(classroomList).toHaveLength(4);

    expect(classroomList[0].id).toBeDefined();
    expect(classroomList[0].name).toBeDefined();
    expect(classroomList[0].teacherId).toBeDefined();
  });

  it("should be able to list one classroom by id", async () => {
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const [classroomExample] = await classroomRepository.find();

    if (classroomExample) {
      const response = await request(app)
        .get(`/classroom/${classroomExample.id}`)
        .set("Authorization", token);

      const classroom = response.body;

      expect(response.statusCode).toBe(200);

      expect(classroom.id).toBe(classroomExample.id);
      expect(classroom.name).toBe(classroomExample.name);
      expect(classroom.teacherId).toMatchObject(classroom.teacherId);
    }
  });
});
