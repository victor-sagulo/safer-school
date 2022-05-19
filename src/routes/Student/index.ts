import { Router } from "express";
import { StudentController } from "../../controllers";

const studentRoutes = Router();

studentRoutes.get("/", StudentController.index);
studentRoutes.get("/:id", StudentController.show);
studentRoutes.post("/", StudentController.store);
studentRoutes.patch("/:id", StudentController.update);
studentRoutes.patch("/entry/:id", StudentController.updateEntry);
studentRoutes.patch("/leave/:id", StudentController.updateLeave);
studentRoutes.delete("/:id", StudentController.delete);

export default studentRoutes;
