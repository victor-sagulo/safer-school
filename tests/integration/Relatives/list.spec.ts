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

describe("Testing relatives list", () => {
  it("should be able to list all relatives", async () => {
    const response = await request(app)
      .get("/relatives")
      .set("Authorization", token);
    const relativesList = response.body;

    expect(response.statusCode).toBe(200);
    expect(relativesList).toHaveLength(5);

    expect(relativesList[0]).toHaveProperty("id");
    expect(relativesList[0]).toHaveProperty("name");
    expect(relativesList[0]).toHaveProperty("email");
    expect(relativesList[0]).toHaveProperty("phone");
  });

  it("should be able to list only one relative by id", async () => {
    const relativeExample = relativeExamples[0];

    const relativeRepository = AppDataSource.getRepository(Relative);

    const relativeToVerify = await relativeRepository.findOneBy({
      email: relativeExample.email,
    });

    if (relativeToVerify) {
      const response = await request(app)
        .get(`/relatives/${relativeToVerify.id}`)
        .set("Authorization", token);

      const relative = response.body;

      expect(response.statusCode).toBe(200);
      expect(relative).toMatchObject({ ...relativeToVerify });
    }
  });
});
