import { Router } from "express";
import { ClassroomController } from "../../controllers";
import { validateData } from "../../middlewares";
import { validateIdParams } from "../../middlewares/validateIdParams.middleware";
import { storeClassroom, updateClassroom } from "../../schemas";

const classroomRoutes = Router();

classroomRoutes.get("/", ClassroomController.index);
classroomRoutes.post(
  "/",
  validateData(storeClassroom),
  ClassroomController.store
);
classroomRoutes.get("/:id", validateIdParams, ClassroomController.show);
classroomRoutes.patch(
  "/:id",
  validateIdParams,
  validateData(updateClassroom),
  ClassroomController.update
);
classroomRoutes.delete("/:id", validateIdParams, ClassroomController.delete);
classroomRoutes.get(
  "/students/:id",
  validateIdParams,
  ClassroomController.listStudents
);

export default classroomRoutes;
