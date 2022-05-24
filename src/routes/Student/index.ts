import { Router } from "express";
import { StudentController } from "../../controllers";
import { validateIdParams } from "./../../middlewares";
import { validateData, validateAdmMiddleware } from "../../middlewares";
import {
  addStudentRelative,
  addStudentToClassroom,
  storeStudent,
  updateStudent,
} from "../../schemas";

const studentRoutes = Router();

studentRoutes.get("/", validateAdmMiddleware, StudentController.index);
studentRoutes.get(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  StudentController.show
);
studentRoutes.post(
  "/",
  validateAdmMiddleware,
  validateData(storeStudent),
  StudentController.store
);
studentRoutes.patch(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  validateData(updateStudent),
  StudentController.update
);
studentRoutes.patch(
  "/entry/:id",
  validateAdmMiddleware,
  validateIdParams,
  StudentController.updateEntry
);
studentRoutes.patch(
  "/leave/:id",
  validateAdmMiddleware,
  validateIdParams,
  StudentController.updateLeave
);
studentRoutes.delete(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  StudentController.delete
);
studentRoutes.post(
  "/relatives",
  validateAdmMiddleware,
  validateData(addStudentRelative),
  StudentController.addStudentRelative
);
studentRoutes.get(
  "/relatives/:id",
  validateAdmMiddleware,
  validateIdParams,
  StudentController.listStudentRelatives
);
studentRoutes.patch(
  "/classroom/:id",
  validateAdmMiddleware,
  validateIdParams,
  validateData(addStudentToClassroom),
  StudentController.addStudentToClassroom
);

export default studentRoutes;
