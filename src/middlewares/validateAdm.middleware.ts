import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

interface Data {
  email: string;
  id: string;
  isAdm: boolean;
}

export const validateAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(401, "Unauthorized");
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY as string);

    const infos = data as Data;

    if (!infos.isAdm) {
      throw new AppError(401, "Unauthorized");
    }

    next();
  } catch (error) {
    throw new AppError(401, "Unauthorized");
  }
};
