import express from "express";
import { handleErrors } from "./errors";

const app = express();

app.use(express.json);

app.use(handleErrors);

app.listen(process.env.POSTGRES_PORT || 3000);
