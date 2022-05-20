import { Router } from "express";
import { ClassroomController } from "../../controllers";
import { validateIdParams } from "../../middlewares/validateIdParams.middleware";

const classroomRoutes = Router();

classroomRoutes.get("/", ClassroomController.index);
classroomRoutes.post("/", ClassroomController.store);
classroomRoutes.get("/:id", validateIdParams, ClassroomController.show);
classroomRoutes.patch("/:id", validateIdParams, ClassroomController.update);
classroomRoutes.delete("/:id", validateIdParams, ClassroomController.delete);
classroomRoutes.get(
  "/students/:id",
  validateIdParams,
  ClassroomController.listStudents
);

export default classroomRoutes;
