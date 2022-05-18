import { Request, Response } from "express";
import { listStudentsService } from "../../services";

export class StudentController {
  static async index(req: Request, res: Response) {
    const students = await listStudentsService();

    res.status(200).json(students);
  }
}
