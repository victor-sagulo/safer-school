import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Relative } from "../../../src/entities";
import { relativeExamples } from "../../fixtures/relatives";
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

const valuesToUpdate = {
  email: "girafales@email.com",
  name: "Professor Girafales",
  phone: "11110000",
};

describe("Testing relatives update", () => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  it("should be able to update one relative", async () => {
    const relativeExample = relativeExamples[0];

    const relative = await relativeRepository.findOneBy({
      email: relativeExample.email,
    });

    if (relative) {
      const response = await request(app)
        .patch(`/relatives/${relative.id}`)
        .send({
          email: valuesToUpdate.email,
          name: valuesToUpdate.name,
          phone: valuesToUpdate.phone,
        })
        .set("Authorization", token);

      const relativeUpdated = response.body;

      expect(relativeUpdated.email).toBe(valuesToUpdate.email);
      expect(relativeUpdated.name).toBe(valuesToUpdate.name);
      expect(relativeUpdated.phone).toBe(valuesToUpdate.phone);

      const pastEmailFromDb = await relativeRepository.findOneBy({
        email: relativeExample.email,
      });

      expect(pastEmailFromDb).toBeFalsy();

      const newEmailFromDb = await relativeRepository.findOneBy({
        email: valuesToUpdate.email,
      });

      expect(newEmailFromDb?.id).toBeDefined();
    }
  });

  it("should not be able to update a not found relative", async () => {
    const response = await request(app)
      .patch("/relatives/2b133b1b-97dd-4e3d-a8d8-e86da085f43f")
      .send({ name: relativeExamples[3].name })
      .set("Authorization", token);

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Relative not found");
  });

  it("should not be able to update id", async () => {
    const relativeExample = relativeExamples[2];

    const relative = await relativeRepository.findOneBy({
      email: relativeExample.email,
    });

    const newId = "2b133b1b-97dd-4e3d-a8d8-e86da085f43f";

    const response = await request(app)
      .patch(`/relatives/${relative?.id}`)
      .send({ id: newId })
      .set("Authorization", token);

    const teacherUpdated = response.body;

    expect(response.statusCode).toBe(400);
    expect(teacherUpdated.status).toBe("error");
    expect(teacherUpdated.message).toBe("You must provide data to be updated");

    const countTeacherNewId = await relativeRepository.countBy({
      id: newId,
    });

    expect(countTeacherNewId).toBe(0);

    const countTeacherOldId = await relativeRepository.countBy({
      id: relative?.id,
    });

    expect(countTeacherOldId).toBe(1);
  });
});
