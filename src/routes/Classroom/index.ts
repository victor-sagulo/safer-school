import { Router } from "express";
import { ClassroomController } from "../../controllers";
import { validateData, validateAdmMiddleware } from "../../middlewares";
import { validateIdParams } from "../../middlewares/validateIdParams.middleware";
import { storeClassroom, updateClassroom } from "../../schemas";

const classroomRoutes = Router();

classroomRoutes.get("/", validateAdmMiddleware, ClassroomController.index);
classroomRoutes.post(
  "/",
  validateAdmMiddleware,
  validateData(storeClassroom),
  ClassroomController.store
);
classroomRoutes.get(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  ClassroomController.show
);
classroomRoutes.patch(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  validateData(updateClassroom),
  ClassroomController.update
);
classroomRoutes.delete(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  ClassroomController.delete
);
classroomRoutes.get(
  "/students/:id",
  validateAdmMiddleware,
  validateIdParams,
  ClassroomController.listStudents
);

export default classroomRoutes;
