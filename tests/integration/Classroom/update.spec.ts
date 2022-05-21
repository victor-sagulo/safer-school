import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Classroom } from "../../../src/entities";
import { Teacher } from "../../../src/entities/Teacher";
import { classroomExamples } from "../../fixtures/classroom";
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

const valuesToUpdate = {
  name: "girafales@email.com",
};

describe("Testing classroom update", () => {
  const classroomRepository = AppDataSource.getRepository(Classroom);
  const teacherRepository = AppDataSource.getRepository(Teacher);

  it("should be able to update one teacher", async () => {
    const classroomExample = classroomExamples[3] as Classroom;

    const teacherExample = new Teacher("Mario Alberto", "blue@ball.com.br");

    await teacherRepository.save(teacherExample);

    const classroom = await classroomRepository.findOneBy({
      name: classroomExample.name,
    });

    if (classroom) {
      const response = await request(app)
        .patch(`/classroom/${classroom.id}`)
        .send({ name: valuesToUpdate.name, teacherId: teacherExample?.id });

      const classroomUpdated = response.body;

      expect(response.statusCode).toBe(200);
      expect(classroomUpdated.name).toBe(valuesToUpdate.name);
      expect(classroomUpdated.teacherId).toBe(teacherExample?.id);

      const pastEmailFromDb = await classroomRepository.findOneBy({
        name: classroomExample.name,
      });

      expect(pastEmailFromDb).toBeFalsy();

      const newClassroomFromDb = await classroomRepository.findOneBy({
        id: classroom.id,
      });

      if (newClassroomFromDb) {
        expect(newClassroomFromDb.name).toBe(valuesToUpdate.name);
        expect(newClassroomFromDb.teacherId).toMatchObject({
          ...teacherExample,
        });
      }
    }
  });

  it("should not be able to update classroom id", async () => {
    const classroomExample = classroomExamples[2] as Classroom;

    const classroom = await classroomRepository.findOneBy({
      name: classroomExample.name,
    });

    if (classroom) {
      const newId = "2b133b1b-97dd-4e3d-a8d8-e86da085f43f";

      const response = await request(app)
        .patch(`/classroom/${classroom.id}`)
        .send({ id: newId });

      const classroomUpdated = response.body;

      expect(response.statusCode).toBe(400);
      expect(classroomUpdated.status).toBe("error");
      expect(classroomUpdated.message).toBe(
        "You must provide data to be updated"
      );

      const countClassroomNewId = await classroomRepository.countBy({
        id: newId,
      });

      expect(countClassroomNewId).toBe(0);

      const countClassroomOldId = await classroomRepository.countBy({
        id: classroom.id,
      });

      expect(countClassroomOldId).toBe(1);
    }
  });
});
