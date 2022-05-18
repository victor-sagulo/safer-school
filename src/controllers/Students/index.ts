import { Request, Response } from "express";
import { AppError, handleAppError } from "../../errors";
import {
  createStudentService,
  listOneStudentService,
  listStudentsService,
} from "../../services";

export class StudentController {
  static async store(req: Request, res: Response) {
    try {
      const { name, birth_date, address } = req.body;

      const student = await createStudentService({ name, birth_date, address });

      return res.status(201).json(student);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }
  static async index(req: Request, res: Response) {
    const students = await listStudentsService();

    return res.status(200).json(students);
  }
  static async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const student = await listOneStudentService(id);

      return res.status(200).json(student);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }
}
