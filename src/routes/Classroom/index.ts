import { Router } from "express";
import { ClassroomController } from "../../controllers";

const classroomRoutes = Router();

classroomRoutes.get("/", ClassroomController.index);
classroomRoutes.get("/:id", ClassroomController.show);
classroomRoutes.post("/", ClassroomController.store);
classroomRoutes.patch("/:id", ClassroomController.update);
classroomRoutes.delete("/:id", ClassroomController.delete);

export default classroomRoutes;
