import { Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleAppError = (err: any, res: Response) => {
  return res.status(err.statusCode).json({
    status: "err",
    statusCode: err.statusCode,
    message: err.message,
  });
};
