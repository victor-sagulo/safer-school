import { Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleAppError = (err: AppError, res: Response) => {
  return res.status(err.statusCode).json({
    status: "err",
    statusCode: err.statusCode,
    message: err.message,
  });
};
