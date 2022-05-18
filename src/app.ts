import express from "express";
import { useRoutes } from "./routes";
import { handleErrors } from "./errors";

const app = express();

app.use(express.json);

app.use(handleErrors);

useRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
