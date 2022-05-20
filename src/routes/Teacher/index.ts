import { Router } from "express";
import { TeacherController } from "../../controllers";
import { validateData, validateIdParams } from "../../middlewares";
import { storeTeacher, updateTeacher } from "../../schemas";

const teacherRoutes = Router();

teacherRoutes.get("/", TeacherController.index);
teacherRoutes.post("/", validateData(storeTeacher), TeacherController.store);

teacherRoutes.get("/:id", validateIdParams, TeacherController.show);
teacherRoutes.patch(
  "/:id",
  validateIdParams,
  validateData(updateTeacher),
  TeacherController.update
);
teacherRoutes.delete("/:id", validateIdParams, TeacherController.delete);

export default teacherRoutes;
