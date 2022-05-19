import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const validateIdParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  const isUuid = regex.test(id);

  if (isUuid) {
    return next();
  }

  throw new AppError(400, "Invalid id");
};
