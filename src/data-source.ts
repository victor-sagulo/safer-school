import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

const prodDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: true,
  entities: ["dist/entities/*/*.ts"],
  migrations: ["dist/migrations/*.ts"],
};

const devDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: false,
  synchronize: false,
  logging: true,
  entities: ["src/entities/*/*.ts"],
  migrations: ["src/migrations/*.ts"],
};

const testDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: "postgres://postgres:postgres@localhost:5434/test_database",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*/*.ts"],
  dropSchema: true,
};

let currentDataSourceOptions = devDataSourceOptions;

if (process.env.NODE_ENV === "production") {
  currentDataSourceOptions = prodDataSourceOptions;
} else if (process.env.NODE_ENV === "test") {
  currentDataSourceOptions = testDataSourceOptions;
}

export const AppDataSource = new DataSource(currentDataSourceOptions);

if (process.env.NODE_ENV !== "test") {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data source initialized");
    })
    .catch((err) => {
      console.log("Error during the Data Source initialization", err);
    });
}
