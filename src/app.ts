import "express-async-errors";
import express from "express";
import { useRoutes } from "./routes";
import { handleErrors } from "./errors";

const app = express();

app.use(express.json());

useRoutes(app);

app.use(handleErrors);

export { app };
