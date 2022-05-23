import { Request, Response } from "express";
import { AppError } from "../../errors";
import {
  createTeacherService,
  deleteTeacherService,
  listOneTeacherService,
  listTeacherService,
  updateTeacherService,
} from "../../services";

export class TeacherController {
  static async store(req: Request, res: Response) {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new AppError(
        400,
        "You must provide a name and email to register a teacher"
      );
    }
    const createTeacher = await createTeacherService({ name, email });

    return res.status(201).json(createTeacher);
  }

  static async index(req: Request, res: Response) {
    const teachers = await listTeacherService();

    return res.status(200).json(teachers);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const teacher = await listOneTeacherService(id);

    return res.status(200).json(teacher);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name && !email) {
      throw new AppError(400, "You must provide data to be updated");
    }

    const updatedTeacher = await updateTeacherService({ id, name, email });

    return res.status(200).json(updatedTeacher);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await deleteTeacherService(id);

    return res.sendStatus(204);
  }
}
