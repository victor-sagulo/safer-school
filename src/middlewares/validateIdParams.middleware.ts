import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const validateIdParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  const isUuid = regex.test(req.params.id);

  if (isUuid) {
    return next();
  }

  throw new AppError(400, "Invalid id");
};
