import { DataSource } from "typeorm";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import { dbConnect, dbDestroy, populateDb } from "../../helpers/dbHandler";
import { AppDataSource } from "../../../src/data-source";
import { Classroom, Teacher } from "../../../src/entities";
import request from "supertest";
import { app } from "../../../src/app";

let connection: DataSource;

beforeAll(async () => {
  const db = await dbConnect();

  if (db) connection = db;

  await populateDb();
});

afterAll(async () => {
  await dbDestroy(connection);
});

describe("Testing classroom creation", () => {
  const teacherRepository = AppDataSource.getRepository(Teacher);
  const classroomRepository = AppDataSource.getRepository(Classroom);

  it("should be able to create a classroom", async () => {
    const teacherExample = new Teacher("Mario Alberto", "blue@ball.com.br");

    await teacherRepository.save(teacherExample);

    const classroomExample = {
      name: "turma do fundao",
    };

    if (teacherExample) {
      const response = await request(app).post("/classroom").send({
        name: classroomExample.name,
        teacherId: teacherExample.id,
      });

      const classroom = response.body;

      expect(response.statusCode).toBe(201);

      expect(classroom.id).toBeDefined();
      expect(classroom.name).toBe(classroomExample.name);
      expect(classroom.teacherId).toBe(teacherExample.id);

      const classroomCreatedFromDb = await classroomRepository.findOneBy({
        id: classroom.id,
      });

      expect(classroomCreatedFromDb).toMatchObject({
        name: classroomExample.name,
        teacherId: teacherExample,
        id: classroom.id,
      });
    }
  });

  it("should not be able to create two classroom with same name", async () => {
    const [classroomExample] = await classroomRepository.find();

    const response = await request(app).post("/classroom").send({
      name: classroomExample.name,
      teacherId: classroomExample.teacherId?.id,
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.status).toBe("err");
    expect(response.body.message).toBe(
      "This classroom already exists in our database"
    );
  });
});
