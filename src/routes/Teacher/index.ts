import { Router } from "express";
import { TeacherController } from "../../controllers";
import { validateIdParams } from "../../middlewares";

const teacherRoutes = Router();

teacherRoutes.get("/", TeacherController.index);
teacherRoutes.post("/", TeacherController.store);

teacherRoutes.get("/:id", validateIdParams, TeacherController.show);
teacherRoutes.patch("/:id", validateIdParams, TeacherController.update);
teacherRoutes.delete("/:id", validateIdParams, TeacherController.delete);

export default teacherRoutes;
