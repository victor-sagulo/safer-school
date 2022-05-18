import express from "express";
import { useRoutes } from "./routes";
import { handleErrors } from "./errors";

const app = express();

app.use(express.json);

app.use(handleErrors);

useRoutes(app);

app.listen(process.env.POSTGRES_PORT || 3000);
