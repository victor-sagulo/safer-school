import { Request, Response } from "express";
import { AppError, handleAppError } from "../../errors";
import {
  createStudentService,
  deleteStudentService,
  enteredAtService,
  leftAtService,
  listOneStudentService,
  listStudentsService,
  updateStudentService,
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
  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, address } = req.body;
    try {
      const student = await updateStudentService({ id, name, address });
      return res.status(200).json(student);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await deleteStudentService(id);
      return res.status(204).json();
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }
  static async updateEntry(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await enteredAtService(id);

      return res.status(200).json({ message: response });
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }
  static async updateLeave(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await leftAtService(id);
      return res.status(200).json({ message: response });
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }
}
