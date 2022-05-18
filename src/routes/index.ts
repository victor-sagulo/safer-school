import { Express } from "express";

import { studentRoutes } from "./Student";
import { teacherRoutes } from "./Teacher";

export const useRoutes = (app: Express) => {
  app.use("/students", studentRoutes);
  app.use("/teachers", teacherRoutes);
};
