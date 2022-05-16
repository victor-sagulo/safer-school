import express from "express";

const app = express();
app.use(express.json);

app.listen(process.env.POSTGRES_PORT || 3000);
