import { Request, Response } from "express";
import { createStudentService, listStudentsService } from "../../services";

export class StudentController {
  static async store(req: Request, res: Response) {
    try {
      const { name, birth_date, address } = req.body;

      const student = await createStudentService({ name, birth_date, address });

      return res.status(201).json(student);
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
    const students = await listStudentsService();

    return res.status(200).json(students);
  }
}
