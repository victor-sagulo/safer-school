import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Classroom } from "../../../src/entities";
import { classroomExamples } from "../../fixtures/classroom";
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

describe("Testing classroom deletion", () => {
  it("should be able to delete one classroom", async () => {
    const classroomExample = classroomExamples[0];

    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroom = await classroomRepository.findOneBy({
      name: classroomExample.name,
    });

    if (classroom) {
      const oldEntityLength = await classroomRepository.count();

      const response = await request(app)
        .delete(`/classroom/${classroom.id}`)
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);

      const entityLength = await classroomRepository.count();

      expect(entityLength).toBe(oldEntityLength - 1);
    }
  });

  it("should not be able to delete a false id", async () => {
    const response = await request(app)
      .delete("/classroom/2b133b1b-97dd-4e3d-a8d8-e86da085f43f")
      .set("Authorization", token);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Classroom not found or doesn't exists");
    expect(response.body.status).toBe("error");
  });

  it("should not be able to delete a invalid id (not uuid)", async () => {
    const response = await request(app)
      .delete("/classroom/5")
      .set("Authorization", token);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid id");
    expect(response.body.status).toBe("error");
  });
});
