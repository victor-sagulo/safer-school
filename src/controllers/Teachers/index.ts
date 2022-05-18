import { Request, Response } from "express";
import { createTeacherService, listTeacherService } from "../../services";

export class TeacherController {
  static async store(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      const createTeacher = await createTeacherService({ name, email });

      return res.status(201).json(createTeacher);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          status: "error",
          message: err.message,
        });
      }
    }
  }

  static async index(req: Request, res: Response) {
    const teachers = await listTeacherService();

    return res.status(200).json(teachers);
  }
}
