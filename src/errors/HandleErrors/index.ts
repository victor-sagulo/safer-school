/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError";

export const handleErrors = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
