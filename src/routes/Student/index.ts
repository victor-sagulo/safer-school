import { Router } from "express";
import { StudentController } from "../../controllers";
import { validateIdParams } from "./../../middlewares";

const studentRoutes = Router();

studentRoutes.get("/", StudentController.index);
studentRoutes.get("/:id", validateIdParams, StudentController.show);
studentRoutes.post("/", StudentController.store);
studentRoutes.patch("/:id", validateIdParams, StudentController.update);
studentRoutes.patch(
  "/entry/:id",
  validateIdParams,
  StudentController.updateEntry
);
studentRoutes.patch(
  "/leave/:id",
  validateIdParams,
  StudentController.updateLeave
);
studentRoutes.delete("/:id", validateIdParams, StudentController.delete);

export default studentRoutes;
