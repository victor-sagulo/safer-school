import { Router } from "express";
import { RelativesController } from "../../controllers";

const relativeRoutes = Router();

relativeRoutes.post("/", RelativesController.store);
relativeRoutes.get("/", RelativesController.index);
relativeRoutes.get("/:id", RelativesController.show);
relativeRoutes.patch("/:id", RelativesController.update);
relativeRoutes.delete("/:id", RelativesController.delete);

export default relativeRoutes;
