import { Request, Response } from "express";
import { AppError, handleAppError } from "../../errors";
import {
  createTeacherService,
  deleteTeacherService,
  listTeacherService,
  updateTeacherService,
} from "../../services";

export class TeacherController {
  static async store(req: Request, res: Response) {
    const { name, email } = req.body;
    try {
      const createTeacher = await createTeacherService({ name, email });

      return res.status(201).json(createTeacher);
    } catch (err) {
      if (err instanceof AppError) {
        handleAppError(err, res);
      }
    }
  }

  static async index(req: Request, res: Response) {
    const teachers = await listTeacherService();

    return res.status(200).json(teachers);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updatedTeacher = await updateTeacherService({ id, name, email });

      return res.status(200).json(updatedTeacher);
    } catch (err) {
      if (err instanceof AppError) {
        return handleAppError(err, res);
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await deleteTeacherService(id);

      return res.status(204).json();
    } catch (err) {
      if (err instanceof AppError) {
        return handleAppError(err, res);
      }
    }
  }
}
