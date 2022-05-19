import { Router } from "express";
import { RelativesController } from "../../controllers";
import { validateIdParams } from "../../middlewares";

const relativeRoutes = Router();

relativeRoutes.post("/", RelativesController.store);
relativeRoutes.get("/", RelativesController.index);
relativeRoutes.get("/:id", validateIdParams, RelativesController.show);
relativeRoutes.patch("/:id", validateIdParams, RelativesController.update);
relativeRoutes.delete("/:id", validateIdParams, RelativesController.delete);

export default relativeRoutes;
