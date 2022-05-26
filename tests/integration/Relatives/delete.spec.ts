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

describe("Testing relatives deletion", () => {
  it("should be able to delete one relative", async () => {
    const relativeExample = relativeExamples[0];

    const relativeRepository = AppDataSource.getRepository(Relative);

    const relative = await relativeRepository.findOneBy({
      email: relativeExample.email,
    });

    if (relative) {
      const oldEntityLength = await relativeRepository.count();

      const response = await request(app)
        .delete(`/relatives/${relative.id}`)
        .set("Authorization", token);

      expect(response.statusCode).toBe(200);

      const entityLength = await relativeRepository.count();

      expect(entityLength).toBe(oldEntityLength - 1);
    }
  });

  it("should not be able to delete a false id", async () => {
    const response = await request(app)
      .delete("/relatives/2b133b1b-97dd-4e3d-a8d8-e86da085f43f")
      .set("Authorization", token);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Relative not found");
    expect(response.body.status).toBe("error");
  });

  it("should not be able to delete a invalid id (not uuid)", async () => {
    const response = await request(app)
      .delete("/relatives/5")
      .set("Authorization", token);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid id");
    expect(response.body.status).toBe("error");
  });
});
