import { Router } from "express";
import { StudentController } from "../../controllers";
import { validateIdParams } from "./../../middlewares";
import { validateData } from "../../middlewares";
import {
  addStudentRelative,
  addStudentToClassroom,
  storeStudent,
  updateStudent,
} from "../../schemas";

const studentRoutes = Router();

studentRoutes.get("/", StudentController.index);
studentRoutes.get("/:id", validateIdParams, StudentController.show);
studentRoutes.post("/", validateData(storeStudent), StudentController.store);
studentRoutes.patch(
  "/:id",
  validateIdParams,
  validateData(updateStudent),
  StudentController.update
);
studentRoutes.patch(
  "/entry/:id",
  validateIdParams,
  StudentController.updateEntry
);
studentRoutes.patch(
  "/leave/:id",
  validateIdParams,
  StudentController.updateLeave
);
studentRoutes.delete("/:id", validateIdParams, StudentController.delete);
studentRoutes.post(
  "/relatives",
  validateData(addStudentRelative),
  StudentController.addStudentRelative
);
studentRoutes.get(
  "/relatives/:id",
  validateIdParams,
  StudentController.listStudentRelatives
);
studentRoutes.patch(
  "/classroom/:id",
  validateIdParams,
  validateData(addStudentToClassroom),
  StudentController.addStudentToClassroom
);

export default studentRoutes;
