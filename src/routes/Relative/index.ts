import { Router } from "express";
import { RelativesController } from "../../controllers";
import {
  validateAdmMiddleware,
  validateData,
  validateIdParams,
  validateTokenMiddleware,
} from "../../middlewares";
import { login, storeRelative, updateRelative } from "../../schemas";

const relativeRoutes = Router();

relativeRoutes.post(
  "/",
  validateData(storeRelative),
  RelativesController.store
);
relativeRoutes.get("/", validateAdmMiddleware, RelativesController.index);
relativeRoutes.get(
  "/:id",
  validateTokenMiddleware,
  validateIdParams,
  RelativesController.show
);
relativeRoutes.patch(
  "/:id",
  validateTokenMiddleware,
  validateIdParams,
  validateData(updateRelative),
  RelativesController.update
);
relativeRoutes.delete(
  "/:id",
  validateTokenMiddleware,
  validateIdParams,
  RelativesController.delete
);
relativeRoutes.get(
  "/students/:id",
  validateTokenMiddleware,
  validateIdParams,
  RelativesController.listStudents
);
relativeRoutes.post("/login", validateData(login), RelativesController.login);

export default relativeRoutes;
