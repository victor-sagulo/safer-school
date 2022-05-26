import { Router } from "express";
import { TeacherController } from "../../controllers";
import {
  validateData,
  validateIdParams,
  validateAdmMiddleware,
} from "../../middlewares";
import { storeTeacher, updateTeacher } from "../../schemas";

const teacherRoutes = Router();

teacherRoutes.get("/", validateAdmMiddleware, TeacherController.index);
teacherRoutes.post(
  "/",
  validateAdmMiddleware,
  validateData(storeTeacher),
  TeacherController.store
);

teacherRoutes.get(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  TeacherController.show
);
teacherRoutes.patch(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  validateData(updateTeacher),
  TeacherController.update
);
teacherRoutes.delete(
  "/:id",
  validateAdmMiddleware,
  validateIdParams,
  TeacherController.delete
);

export default teacherRoutes;
