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

const valuesToUpdate = {
  address: "internet",
  name: "Juninho Gameplay",
};

describe("Testing students update", () => {
  const studentRepository = AppDataSource.getRepository(Student);

  it("should be able to update one student", async () => {
    const studentExample = studentExamples[0];

    const student = await studentRepository.findOneBy({
      name: studentExample.name,
    });

    const response = await request(app)
      .patch(`/students/${student?.id}`)
      .send({ address: valuesToUpdate.address, name: valuesToUpdate.name });

    const studentUpdated = response.body;

    expect(studentUpdated.address).toBe(valuesToUpdate.address);

    expect(studentUpdated.name).toBe(valuesToUpdate.name);

    const pastStudentFromDb = await studentRepository.findOneBy({
      name: studentExample.name,
    });

    expect(pastStudentFromDb).toBeFalsy();

    const newStudentFromDb = await studentRepository.findOneBy({
      name: valuesToUpdate.name,
    });

    expect(newStudentFromDb?.id).toBeDefined();
    expect(newStudentFromDb?.address).toBe(valuesToUpdate.address);
  });

  it("should not be able to update student id", async () => {
    const studentExample = studentExamples[2];

    const student = await studentRepository.findOneBy({
      name: studentExample.name,
    });

    const newId = "2b133b1b-97dd-4e3d-a8d8-e86da085f43f";

    const response = await request(app)
      .patch(`/students/${student?.id}`)
      .send({ id: newId });

    const studentUpdated = response.body;

    expect(response.statusCode).toBe(400);
    expect(studentUpdated.status).toBe("error");
    expect(studentUpdated.message).toBe("You must provide data to be updated");

    const countStudentNewId = await studentRepository.countBy({
      id: newId,
    });

    expect(countStudentNewId).toBe(0);

    const countStudentOldId = await studentRepository.countBy({
      id: student?.id,
    });

    expect(countStudentOldId).toBe(1);
  });
});
