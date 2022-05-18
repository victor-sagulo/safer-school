import { Router } from "express";
import { StudentController } from "../../controllers";

export const studentRoutes = Router();

studentRoutes.get("/", StudentController.index);
studentRoutes.get("/:id", StudentController.show);
studentRoutes.post("/", StudentController.store);
studentRoutes.put("/:id", StudentController.update);
studentRoutes.patch("/entry/:id", StudentController.updateEntry);
studentRoutes.patch("/leave/:id", StudentController.updateLeave);
