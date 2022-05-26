import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../src/app";
import { AppDataSource } from "../../../src/data-source";
import { Relative } from "../../../src/entities";
import { dbConnect, dbDestroy, populateDb } from "../../helpers/dbHandler";

let connection: DataSource;

const relativeExample = {
  name: "Maria Paula Silva",
  email: "tia_paulinha@yahoo.com.br",
  phone: "456789658",
  password: "password",
};

const relativeSameEmail = {
  name: "Joana Paula Silva",
  email: "tia_paulinha@yahoo.com.br",
  phone: "784512369",
  password: "password",
};

beforeAll(async () => {
  const db = await dbConnect();

  if (db) connection = db;

  await populateDb();
});

afterAll(async () => {
  await dbDestroy(connection);
});

describe("Testing teachers creation", () => {
  const relativeRepository = AppDataSource.getRepository(Relative);

  it("should be able to create a new relative", async () => {
    const response = await request(app)
      .post("/relatives")
      .send(relativeExample);

    const relativeCreated = response.body;

    expect(response.statusCode).toBe(201);
    expect(typeof relativeCreated.id).toBe("string");
    expect(relativeCreated.name).toBe(relativeExample.name);
    expect(relativeCreated.email).toBe(relativeExample.email);
    expect(relativeCreated.phone).toBe(relativeExample.phone);

    const relativeFromDb = await relativeRepository.findOneBy({
      email: relativeExample.email,
    });

    if (relativeFromDb) {
      expect(relativeFromDb.id).toBe(relativeCreated.id);
      expect(relativeFromDb.name).toBe(relativeCreated.name);
      expect(relativeFromDb.email).toBe(relativeCreated.email);
      expect(relativeFromDb.phone).toBe(relativeCreated.phone);
    }
  });

  it("should not be able to create two relatives with same email", async () => {
    const response = await request(app)
      .post("/relatives")
      .send(relativeSameEmail);

    expect(response.statusCode).toBe(409);
    expect(response.body.id).toBeUndefined();
    expect(response.body.message).toBe("This email already exists");
    expect(response.body.status).toBe("error");

    const countRelatives = await relativeRepository.countBy({
      email: relativeSameEmail.email,
    });

    expect(countRelatives).toBe(1);
  });
});
