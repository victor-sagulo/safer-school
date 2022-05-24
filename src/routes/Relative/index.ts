import { Router } from "express";
import { RelativesController } from "../../controllers";
import { validateData, validateIdParams } from "../../middlewares";
import { login, storeRelative, updateRelative } from "../../schemas";

const relativeRoutes = Router();

relativeRoutes.post(
  "/",
  validateData(storeRelative),
  RelativesController.store
);
relativeRoutes.get("/", RelativesController.index);
relativeRoutes.get("/:id", validateIdParams, RelativesController.show);
relativeRoutes.patch(
  "/:id",
  validateIdParams,
  validateData(updateRelative),
  RelativesController.update
);
relativeRoutes.delete("/:id", validateIdParams, RelativesController.delete);
relativeRoutes.get(
  "/students/:id",
  validateIdParams,
  RelativesController.listStudents
);
relativeRoutes.post("/login", validateData(login), RelativesController.login);

export default relativeRoutes;
