import { Express } from "express";

import classroomRoutes from "./Classroom";
import studentRoutes from "./Student";
import teacherRoutes from "./Teacher";
import relativeRoutes from "./Relative";

export const useRoutes = (app: Express) => {
  app.use("/students", studentRoutes);
  app.use("/teachers", teacherRoutes);
  app.use("/classroom", classroomRoutes);
  app.use("/relative", relativeRoutes);
};
