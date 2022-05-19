import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "yup";
import { AppError } from "../errors";

export function validateData(schema: ObjectSchema<any>) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);

      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new AppError(400, err.message);
      }
    }
  };
}
