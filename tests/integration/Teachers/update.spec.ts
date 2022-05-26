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

const valuesToUpdate = {
  email: "girafales@email.com",
  name: "Professor Girafales",
};

describe("Testing teachers update", () => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  it("should be able to update one teacher", async () => {
    const teacherExample = teacherExamples[0] as Teacher;

    const teacher = await teacherRepository.findOneBy({
      email: teacherExample.email,
    });

    const response = await request(app)
      .patch(`/teachers/${teacher?.id}`)
      .send({ email: valuesToUpdate.email, name: valuesToUpdate.name })
      .set("Authorization", token);

    const teacherUpdated = response.body;

    expect(teacherUpdated.email).toBe(valuesToUpdate.email);

    expect(teacherUpdated.name).toBe(valuesToUpdate.name);

    const pastEmailFromDb = await teacherRepository.findOneBy({
      email: teacherExample.email,
    });

    expect(pastEmailFromDb).toBeFalsy();

    const newEmailFromDb = await teacherRepository.findOneBy({
      email: valuesToUpdate.email,
    });

    expect(newEmailFromDb?.id).toBeDefined();
  });

  it("should not be able to update teacher id", async () => {
    const teacherExample = teacherExamples[2] as Teacher;

    const teacher = await teacherRepository.findOneBy({
      email: teacherExample.email,
    });

    const newId = "2b133b1b-97dd-4e3d-a8d8-e86da085f43f";

    const response = await request(app)
      .patch(`/teachers/${teacher?.id}`)
      .send({ id: newId })
      .set("Authorization", token);

    const teacherUpdated = response.body;

    expect(response.statusCode).toBe(400);
    expect(teacherUpdated.status).toBe("error");
    expect(teacherUpdated.message).toBe("You must provide data to be updated");

    const countTeacherNewId = await teacherRepository.countBy({
      id: newId,
    });

    expect(countTeacherNewId).toBe(0);

    const countTeacherOldId = await teacherRepository.countBy({
      id: teacher?.id,
    });

    expect(countTeacherOldId).toBe(1);
  });
});
